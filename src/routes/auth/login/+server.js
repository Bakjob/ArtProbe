export async function POST({ request, cookies }) {
	const { username, password } = await request.json()
	// Here you would normally validate the username and password
	// For demonstration, we assume any username/password is valid

	// Set a session cookie (in a real app, use a secure, unique session ID)
	cookies.set('session', 'dummy-session-id', { path: '/' })

	return new Response(null, { status: 204 })
}
