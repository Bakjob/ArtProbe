import pool from '$lib/server/db.js'
import { error, fail, redirect } from '@sveltejs/kit'
import { getUserBySession } from '$lib/server/auth.js'

export async function load({ params, cookies }) {
	const { username } = params
	const session = cookies.get('session')
	const viewer = session ? await getUserBySession(session) : null

	// hooks.server.js already protects /profile routes, but keep this safe.
	if (!viewer) {
		throw redirect(303, '/auth/login')
	}

	const userResult = await pool.query('SELECT user_id, username FROM users WHERE username = $1', [
		username
	])

	if (userResult.rows.length === 0) {
		throw error(404, 'User not found')
	}

	const profileUser = userResult.rows[0]
	const canEditProfile = viewer.user_id === profileUser.user_id

	if (!canEditProfile) {
		throw error(403, 'Forbidden')
	}

	return {
		profile: { user_id: profileUser.user_id, username: profileUser.username },
		viewer: { userId: viewer.user_id, username: viewer.username },
		canEditProfile
	}
}

export const actions = {
	default: async ({ params, cookies, request }) => {
		const { username } = params
		const session = cookies.get('session')
		const viewer = session ? await getUserBySession(session) : null

		if (!viewer) {
			return fail(401, { message: 'Unauthorized' })
		}

		const userResult = await pool.query('SELECT user_id, username FROM users WHERE username = $1', [
			username
		])

		if (userResult.rows.length === 0) {
			throw error(404, 'User not found')
		}

		const profileUser = userResult.rows[0]
		const canEditProfile = viewer.user_id === profileUser.user_id

		if (!canEditProfile) {
			return fail(403, { message: 'Forbidden' })
		}

		const formData = await request.formData()
		const title = String(formData.get('title') ?? '').trim()
		const description = String(formData.get('description') ?? '').trim()
		const deliveryDaysRaw = String(formData.get('delivery_days') ?? '').trim()
		const deliveryDays = Number.parseInt(deliveryDaysRaw, 10)

		if (!title || !description || !Number.isFinite(deliveryDays) || deliveryDays <= 0) {
			return fail(400, {
				message: 'Please fill in title, description and delivery days (must be > 0).'
			})
		}

		try {
			const result = await pool.query(
				`INSERT INTO gigs (user_id, title, description, delivery_days, created_at)
				 VALUES ($1, $2, $3, $4, NOW())
				 RETURNING gig_id`,
				[profileUser.user_id, title, description, deliveryDays]
			)

			const gigId = result.rows[0]?.gig_id
			throw redirect(303, `/profile/${profileUser.username}/gigs`)
		} catch (e) {
			console.error('Error creating gig:', e)
			return fail(500, { message: 'Failed to create gig' })
		}
	}
}
