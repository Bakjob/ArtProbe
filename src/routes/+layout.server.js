import { getUserBySession } from '$lib/server/auth.js'

export async function load({ cookies }) {
	const session = cookies.get('session')

	if (!session) {
		return {
			loggedIn: false,
			user: null
		}
	}

	const user = await getUserBySession(session)

	return {
		loggedIn: !!user,
		user: user ? { username: user.username, userId: user.user_id } : null
	}
}
