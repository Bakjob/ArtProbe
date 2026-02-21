import { json } from '@sveltejs/kit'
import pool from '$lib/server/db.js'
import { getUserBySession } from '$lib/server/auth.js'

// Toggle a like (add or remove)
async function toggleLike(userId, postId) {
	try {
		// Check if the user already liked
		const existingLike = await pool.query(
			'SELECT * FROM post_likes WHERE user_id = $1 AND post_id = $2',
			[userId, postId]
		)

		if (existingLike.rows.length > 0) {
			// Remove like
			await pool.query('DELETE FROM post_likes WHERE user_id = $1 AND post_id = $2', [
				userId,
				postId
			])
			return { liked: false }
		} else {
			// Add like
			await pool.query('INSERT INTO post_likes (user_id, post_id) VALUES ($1, $2)', [
				userId,
				postId
			])
			return { liked: true }
		}
	} catch (error) {
		console.error('Error toggling like:', error)
		throw error
	}
}

// Get like status for a user and post
async function getLikeStatus(userId, postId) {
	try {
		const result = await pool.query(
			'SELECT COUNT(*) > 0 AS liked FROM post_likes WHERE user_id = $1 AND post_id = $2',
			[userId, postId]
		)
		return result.rows[0].liked
	} catch (error) {
		console.error('Error getting like status:', error)
		return false
	}
}

// Handle POST requests for toggling likes
export async function POST({ request, cookies }) {
	const sessionId = cookies.get('session')
	console.log('Session ID:', sessionId)
	const user = sessionId ? await getUserBySession(sessionId) : null
	console.log('User:', user)

	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 })
	}

	const { postId } = await request.json()
	console.log('Post ID:', postId)
	const userId = user.user_id

	try {
		const result = await toggleLike(userId, postId)
		console.log('Toggle result:', result)
		// updatePostLikes(postId); // No longer needed
		return json({ liked: result.liked })
	} catch (error) {
		console.error('Error in handlelikes endpoint:', error)
		return json({ error: 'Internal server error' }, { status: 500 })
	}
}

// Handle GET requests for like status
export async function GET({ url, cookies }) {
	const sessionId = cookies.get('session')
	const user = sessionId ? await getUserBySession(sessionId) : null

	const postId = url.searchParams.get('postId')

	if (!user || !postId) {
		return json({ liked: false })
	}

	const userId = user.user_id

	try {
		const liked = await getLikeStatus(userId, parseInt(postId))
		return json({ liked })
	} catch (error) {
		return json({ liked: false })
	}
}
