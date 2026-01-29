import pool from '$lib/server/db.js'
import { error } from '@sveltejs/kit'
import { getUserBySession } from '$lib/server/auth.js'

export async function load({ params, cookies }) {
	const { username } = params
	const session = cookies.get('session')
	const viewer = session ? await getUserBySession(session) : null

	try {
		const userResult = await pool.query('SELECT user_id, username FROM users WHERE username = $1', [
			username
		])

		if (userResult.rows.length === 0) {
			throw error(404, 'User not found')
		}

		const user = userResult.rows[0]
		const canEditProfile = !!viewer?.user_id && viewer.user_id === user.user_id

		const gigsResult = await pool.query(
			'SELECT gig_id, user_id, title, description, delivery_days, created_at FROM gigs WHERE user_id = $1 ORDER BY created_at DESC',
			[user.user_id]
		)

		return {
			profile: user,
			gigs: gigsResult.rows,
			viewer: viewer ? { userId: viewer.user_id, username: viewer.username } : null,
			canEditProfile
		}
	} catch (err) {
		console.error('Error loading user gigs:', err)
		throw error(500, 'Failed to load gigs')
	}
}
