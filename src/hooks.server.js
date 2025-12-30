import { redirect } from '@sveltejs/kit'

export async function handle({ event, resolve }) {
	const protectedRoutes = ['/profile', '/create', '/settings']

	if (protectedRoutes.some((route) => event.url.pathname.startsWith(route))) {
		const sessionId = event.cookies.get('session')

		if (!sessionId) {
			throw redirect(303, '/auth/login')
		}
	}

	return await resolve(event)
}
