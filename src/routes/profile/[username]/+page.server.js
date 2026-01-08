import pool from '$lib/server/db.js'
import { error } from '@sveltejs/kit'
import { getUserBySession } from '$lib/server/auth.js'

export async function load({ params, cookies }) {
	const { username } = params
	const session = cookies.get('session')
	const viewer = session ? await getUserBySession(session) : null
	
	try {
		// Fetch user by username, plus profile fields used on the page
		const userResult = await pool.query(
			'SELECT user_id, username, age, gender, bio, created_at FROM users WHERE username = $1',
			[username]
		)
		if (userResult.rows.length === 0) {
			throw error(404, 'User not found')
		}
		const user = userResult.rows[0]

		// Fetch additional profile data as needed
		const gigsResult = await pool.query('SELECT * FROM gigs WHERE user_id = $1', [user.user_id])
		const postsResult = await pool.query('SELECT * FROM posts WHERE user_id = $1', [user.user_id])
		const reviewsResult = await pool.query('SELECT * FROM reviews WHERE reviewee_id = $1', [user.user_id])

		const canEditProfile = !!viewer?.user_id && viewer.user_id === user.user_id

		return {
			viewer: viewer ? { userId: viewer.user_id, username: viewer.username } : null,
			canEditProfile,
			profile: {
				...user,
				gigs: gigsResult.rows,
				posts: postsResult.rows,
				reviews: reviewsResult.rows
			}
		}

	} catch (err) {
		console.error('Error:', err)
		throw error(500, 'Failed to load seller stats')
	}
}
