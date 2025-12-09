import { loginUser, getUserBySession } from '$lib/server/auth.js'
import { json } from '@sveltejs/kit'

export async function POST({ request, cookies }) {
	// Check if already logged in
	const existingSession = cookies.get('session')
	if (existingSession) {
		const user = await getUserBySession(existingSession)
		if (user) {
			return json({ error: 'Already logged in' }, { status: 400 })
		}
	}

	const { username, password } = await request.json()

	const result = await loginUser(username, password)

	if (!result.success) {
		return json({ error: result.error }, { status: 400 })
	}

	// Set session cookie
	cookies.set('session', result.sessionId, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 7 // 7 days
	})

	return json({ message: 'Login successful', userId: result.userId }, { status: 200 })
}
