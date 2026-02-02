import { getUserBySession } from '$lib/server/auth.js'
import { redirect } from '@sveltejs/kit'
import pool from '$lib/server/db.js'
import { r2 } from '$lib/server/r2.js'
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import sharp from 'sharp'

// Bildstorlekar
const AVATAR_SIZE = { width: 512, height: 512 }
const BACKGROUND_SIZE = { width: 1920, height: 1080 }
const IMAGE_QUALITY = 85 // Justera kvaliteten för JPEG-komprimering (1-100)

/**
 * Loads the current user's profile data for editing.
 * Loads when visiting /profile/edit
 *
 * @param {} param0 - load parameters
 * @param {object} param0.cookies - cookies object to access session
 * @returns - user profile data for editing
 */
export async function load({ cookies }) {
	const sessionId = cookies.get('session')

	if (!sessionId) {
		throw redirect(303, '/auth/login')
	}

	const user = await getUserBySession(sessionId)

	if (!user) {
		throw redirect(303, '/auth/login')
	}

	// Get full user data including gender, bio, age
	const result = await pool.query(
		'SELECT user_id, username, email, phone, age, gender, bio, avatar_url, background_url FROM users WHERE user_id = $1',
		[user.user_id]
	)

	return {
		user: result.rows[0]
	}
}

export const actions = {
	update: async ({ request, cookies }) => {
		const sessionId = cookies.get('session')

		if (!sessionId) {
			return { success: false, error: 'Not authenticated' }
		}

		const user = await getUserBySession(sessionId)

		if (!user) {
			return { success: false, error: 'Not authenticated' }
		}

		const formData = await request.formData()
		const gender = formData.get('gender')
		const bio = formData.get('bio')
		const age = formData.get('age')
		const phone = formData.get('phone')
		const avatar = formData.get('avatar')
		const background = formData.get('background')

		try {
			let avatarUrl = null
			let backgroundUrl = null

			// Upload avatar if provided
			if (avatar && avatar.size > 0) {
				avatarUrl = await uploadAvatar(user.user_id, avatar)
			}

			// Upload background if provided
			if (background && background.size > 0) {
				backgroundUrl = await uploadBackground(user.user_id, background)
			}

			// Build dynamic SQL query
			const updates = []
			const values = []
			let paramCount = 1

			updates.push(`gender = $${paramCount++}`)
			values.push(gender || null)

			updates.push(`bio = $${paramCount++}`)
			values.push(bio || null)

			updates.push(`age = $${paramCount++}`)
			values.push(age ? parseInt(age) : null)

			updates.push(`phone = $${paramCount++}`)
			values.push(phone || null)

			if (avatarUrl) {
				updates.push(`avatar_url = $${paramCount++}`)
				values.push(avatarUrl)
			}

			if (backgroundUrl) {
				updates.push(`background_url = $${paramCount++}`)
				values.push(backgroundUrl)
			}

			values.push(user.user_id)

			await pool.query(
				`UPDATE users SET ${updates.join(', ')} WHERE user_id = $${paramCount}`,
				values
			)

			return { success: true }
		} catch (error) {
			console.error('Profile update error:', error)
			return { success: false, error: 'Failed to update profile' }
		}
	},

	delete: async ({ cookies }) => {
		const sessionId = cookies.get('session')

		if (!sessionId) {
			return { success: false, error: 'Not authenticated' }
		}

		const user = await getUserBySession(sessionId)

		if (!user) {
			return { success: false, error: 'Not authenticated' }
		}

		try {
			// Get all posts by user to delete images from R2
			const postsResult = await pool.query('SELECT file_url FROM posts WHERE user_id = $1', [
				user.user_id
			])

			// Delete all images from R2
			for (const post of postsResult.rows) {
				try {
					// Extract the key from the full URL
					// URL format: https://pub-xxx.r2.dev/posts/filename.ext
					const url = new URL(post.file_url)
					const key = url.pathname.substring(1) // Remove leading slash

					await r2.send(
						new DeleteObjectCommand({
							Bucket: 'artprobe-bucket',
							Key: key
						})
					)
				} catch (deleteError) {
					console.error('Error deleting image from R2:', deleteError)
					// Continue even if one image fails to delete
				}
			}

			// Delete profile avatar and background from R2
			const userResult = await pool.query(
				'SELECT avatar_url, background_url FROM users WHERE user_id = $1',
				[user.user_id]
			)
			const avatarUrl = userResult.rows[0]?.avatar_url
			const backgroundUrl = userResult.rows[0]?.background_url

			if (avatarUrl) {
				try {
					const url = new URL(avatarUrl)
					const key = url.pathname.substring(1)

					await r2.send(
						new DeleteObjectCommand({
							Bucket: 'artprobe-bucket',
							Key: key
						})
					)
				} catch (deleteError) {
					console.error('Error deleting avatar from R2:', deleteError)
				}
			}

			if (backgroundUrl) {
				try {
					const url = new URL(backgroundUrl)
					const key = url.pathname.substring(1)

					await r2.send(
						new DeleteObjectCommand({
							Bucket: 'artprobe-bucket',
							Key: key
						})
					)
				} catch (deleteError) {
					console.error('Error deleting background from R2:', deleteError)
				}
			}

			// Delete user (CASCADE will handle related records)
			await pool.query('DELETE FROM users WHERE user_id = $1', [user.user_id])

			// Delete session
			await pool.query('DELETE FROM sessions WHERE session_id = $1', [sessionId])

			// Clear session cookie
			cookies.delete('session', { path: '/' })

			// Redirect to home page
			throw redirect(303, '/')
		} catch (error) {
			if (error?.status === 303) throw error
			console.error('Profile deletion error:', error)
			return { success: false, error: 'Failed to delete profile' }
		}
	}
}

/**
 * Bearbetar avatar-bild genom att krympa den om den är större än max-storlek
 *
 * @param {Buffer} imageBuffer - Råbildbufferten från uppladdningen
 * @returns {Promise<Buffer>} - Processad bildbuffer
 */
async function processAvatarImage(imageBuffer) {
	return await sharp(imageBuffer)
		.resize(AVATAR_SIZE.width, AVATAR_SIZE.height, {
			fit: 'inside',
			withoutEnlargement: true
		})
		.jpeg({ quality: IMAGE_QUALITY })
		.toBuffer()
}

/**
 * Bearbetar bakgrundsbild genom att krympa den om den är större än max-storlek
 *
 * @param {Buffer} imageBuffer - Råbildbufferten från uppladdningen
 * @returns {Promise<Buffer>} - Processad bildbuffer
 */
async function processBackgroundImage(imageBuffer) {
	return await sharp(imageBuffer)
		.resize(BACKGROUND_SIZE.width, BACKGROUND_SIZE.height, {
			fit: 'inside',
			withoutEnlargement: true
		})
		.jpeg({ quality: IMAGE_QUALITY })
		.toBuffer()
}

/**
 * Laddar upp en ny avatar och raderar den gamla
 *
 * @param {number} userId - Användarens ID
 * @param {File} avatarFile - Avatar-filen som ska laddas upp
 * @returns {Promise<string>} - URL till den nya avataren
 */
async function uploadAvatar(userId, avatarFile) {
	// Delete old avatar before uploading new one
	const oldUser = await pool.query('SELECT avatar_url FROM users WHERE user_id = $1', [userId])
	if (oldUser.rows[0]?.avatar_url) {
		try {
			const oldUrl = new URL(oldUser.rows[0].avatar_url)
			const oldKey = oldUrl.pathname.substring(1)
			await r2.send(
				new DeleteObjectCommand({
					Bucket: 'artprobe-bucket',
					Key: oldKey
				})
			)
		} catch (deleteError) {
			console.error('Error deleting old avatar:', deleteError)
		}
	}

	const avatarBuffer = Buffer.from(await avatarFile.arrayBuffer())
	const processedAvatar = await processAvatarImage(avatarBuffer)
	const avatarKey = `avatars/${userId}-${Date.now()}.jpg`

	await r2.send(
		new PutObjectCommand({
			Bucket: 'artprobe-bucket',
			Key: avatarKey,
			Body: processedAvatar,
			ContentType: 'image/jpeg'
		})
	)

	return `https://pub-dda74843e5b241c5b5fd0845db919b26.r2.dev/${avatarKey}`
}

/**
 * Laddar upp en ny bakgrundsbild och raderar den gamla
 *
 * @param {number} userId - Användarens ID
 * @param {File} backgroundFile - Bakgrundsbilden som ska laddas upp
 * @returns {Promise<string>} - URL till den nya bakgrundsbilden
 */
async function uploadBackground(userId, backgroundFile) {
	// Delete old background before uploading new one
	const oldUser = await pool.query('SELECT background_url FROM users WHERE user_id = $1', [userId])
	if (oldUser.rows[0]?.background_url) {
		try {
			const oldUrl = new URL(oldUser.rows[0].background_url)
			const oldKey = oldUrl.pathname.substring(1)
			await r2.send(
				new DeleteObjectCommand({
					Bucket: 'artprobe-bucket',
					Key: oldKey
				})
			)
		} catch (deleteError) {
			console.error('Error deleting old background:', deleteError)
		}
	}

	const backgroundBuffer = Buffer.from(await backgroundFile.arrayBuffer())
	const processedBackground = await processBackgroundImage(backgroundBuffer)
	const backgroundKey = `backgrounds/${userId}-${Date.now()}.jpg`

	await r2.send(
		new PutObjectCommand({
			Bucket: 'artprobe-bucket',
			Key: backgroundKey,
			Body: processedBackground,
			ContentType: 'image/jpeg'
		})
	)

	return `https://pub-dda74843e5b241c5b5fd0845db919b26.r2.dev/${backgroundKey}`
}
