import { registerUser } from '$lib/server/auth.js'
import { json } from '@sveltejs/kit'

export async function POST({ request, cookies }) {
	const { username, password, email } = await request.json()

	const result = await registerUser(username, password, email)

	if (!result.success) {
		return json({ error: result.error }, { status: 400 })
	}

	console.log('Registered user ID:', result.userId)

	// Optionally, set session cookie upon registration
	const sessionId = result.sessionId
	if (sessionId) {
		cookies.set('session', sessionId, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7 // 7 days
		})
	}

	return json({ message: 'Registration successful', userId: result.userId }, { status: 201 })
}
