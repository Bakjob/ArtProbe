export const POST = ({ cookies }) => {
	// Register logic here (e.g., save user to database)
	// For demonstration, we skip actual registration
	// Set a session cookie (in a real app, use a secure, unique session ID)
	cookies.set('session', 'dummy-session-id', { path: '/' })
	return new Response(null, { status: 204 })
}
