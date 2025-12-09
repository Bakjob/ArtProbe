import { registerUser } from '$lib/server/auth.js'
import { json } from '@sveltejs/kit'

export async function POST({ request, cookies }) {
	const { username, password, email } = await request.json()

	const result = await registerUser(username, password, email)

	if (!result.success) {
		return json({ error: result.error }, { status: 400 })
	}

	return json({ message: 'Registration successful', userId: result.userId }, { status: 201 })
}
