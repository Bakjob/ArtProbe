import { logoutUser } from '$lib/server/auth.js'
import { json } from '@sveltejs/kit'

export async function POST({ cookies }) {
	const sessionId = cookies.get('session')

	// Delete session from database
	if (sessionId) {
		await logoutUser(sessionId)
	}

	// Clear the session cookie
	cookies.delete('session', { path: '/' })

	return json({ message: 'Logout successful' }, { status: 200 })
}
