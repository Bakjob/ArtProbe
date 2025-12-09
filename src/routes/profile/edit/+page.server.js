import { getUserBySession } from '$lib/server/auth.js'
import { redirect } from '@sveltejs/kit'
import pool from '$lib/server/db.js'

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
		'SELECT user_id, username, email, phone, age, gender, bio FROM users WHERE user_id = $1',
		[user.user_id]
	)

	return {
		user: result.rows[0]
	}
}

export const actions = {
	default: async ({ request, cookies }) => {
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

		try {
			await pool.query(
				'UPDATE users SET gender = $1, bio = $2, age = $3, phone = $4 WHERE user_id = $5',
				[gender || null, bio || null, age ? parseInt(age) : null, phone || null, user.user_id]
			)

			return { success: true }
		} catch (error) {
			console.error('Profile update error:', error)
			return { success: false, error: 'Failed to update profile' }
		}
	}
}
