import pool from '$lib/server/db.js'

export async function load() {
	try {
		const result = await pool.query(
			`SELECT 
				p.post_id,
				p.title,
				p.file_url,
				p.likes,
				p.created_at,
				u.username
			FROM posts p
			JOIN users u ON p.user_id = u.user_id
			WHERE p.created_at >= NOW() - INTERVAL '7 days'
			ORDER BY p.likes DESC, p.created_at DESC`
		)

		return {
			posts: result.rows
		}
	} catch (error) {
		console.error('Error loading posts:', error)
		return {
			posts: []
		}
	}
}
