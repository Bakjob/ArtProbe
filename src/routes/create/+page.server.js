import pool from '$lib/server/db.js'
import { fail, redirect } from '@sveltejs/kit'
import { r2 } from '$lib/server/r2.js'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import crypto from 'crypto'

export async function load() {
	try {
		const result = await pool.query(`SELECT name FROM tags ORDER BY name ASC`)

		const tags = result.rows.map((row) => row.name)

		return { tags }
	} catch (error) {
		console.error('Error fetching tags:', error)
		return { tags: [], error: 'Failed to fetch tags' }
	}
}

export const actions = {
	create: async ({ request, cookies }) => {
		try {
			// Check if user is logged in
			const sessionId = cookies.get('session')

			if (!sessionId) {
				return fail(401, { message: 'Unauthorized' })
			}

			// Get user from session
			const sessionResult = await pool.query(
				`SELECT user_id FROM sessions WHERE id = $1 AND expires_at > NOW()`,
				[sessionId]
			)

			console.log('UserID upload:', sessionResult.rows)

			if (sessionResult.rows.length === 0) {
				return fail(401, { message: 'Unauthorized - Session expired' })
			}

			const userId = sessionResult.rows[0].user_id

			// Parse form data
			const formData = await request.formData()
			const title = formData.get('title')
			const description = formData.get('description')
			const tagsJson = formData.get('tags')
			const imageFile = formData.get('image')

			if (!title || !description || !imageFile) {
				return fail(400, { message: 'Missing required fields' })
			}

			const tags = tagsJson ? JSON.parse(tagsJson) : []

			// Upload image to R2
			const fileExtension = imageFile.name.split('.').pop()
			const fileName = `${crypto.randomUUID()}.${fileExtension}`
			const fileBuffer = await imageFile.arrayBuffer()

			await r2.send(
				new PutObjectCommand({
					Bucket: 'artprobe-bucket',
					Key: `posts/${fileName}`,
					Body: Buffer.from(fileBuffer),
					ContentType: imageFile.type
				})
			)

			const fileUrl = `https://pub-dda74843e5b241c5b5fd0845db919b26.r2.dev/posts/${fileName}`

			// Insert post into database
			const postResult = await pool.query(
				`INSERT INTO posts (user_id, file_url, title, created_at)
			 VALUES ($1, $2, $3, NOW())
			 RETURNING post_id`,
				[userId, fileUrl, title]
			)

			const postId = postResult.rows[0].post_id

			// Insert tags
			for (const tagName of tags) {
				// Insert tag if it doesn't exist
				const tagResult = await pool.query(
					`INSERT INTO tags (name) VALUES ($1)
				 ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
				 RETURNING tag_id`,
					[tagName]
				)

				const tagId = tagResult.rows[0].tag_id

				// Link tag to post
				await pool.query(
					`INSERT INTO post_tags (post_id, tag_id) VALUES ($1, $2)
				 ON CONFLICT DO NOTHING`,
					[postId, tagId]
				)
			}

			throw redirect(303, `/posts/${postId}`)
		} catch (error) {
			// Don't catch redirect errors
			if (error?.status === 303) {
				throw error
			}
			console.error('Error creating post:', error)
			return fail(500, { message: 'Failed to create post', error: error.message })
		}
	}
}
