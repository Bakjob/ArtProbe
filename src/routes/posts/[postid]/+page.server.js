import pool from '$lib/server/db.js'

export async function load({ params }) {
	const { postid } = params

	try {
		// Fetch the post with user info
		const postResult = await pool.query(
			`SELECT 
				p.post_id,
				p.title,
				p.file_url,
				COALESCE(l.like_count, 0) AS likes,
				p.created_at,
				u.username
			FROM posts p
			JOIN users u ON p.user_id = u.user_id
			LEFT JOIN (
				SELECT post_id, COUNT(*) AS like_count
				FROM post_likes
				GROUP BY post_id
			) l ON p.post_id = l.post_id
			WHERE p.post_id = $1`,
			[postid]
		)

		if (postResult.rows.length === 0) {
			return {
				removed: true
			}
		}

		const post = postResult.rows[0]

		// Fetch all tags for the post
		const tagsResult = await pool.query(
			`SELECT t.name
			FROM tags t
			JOIN post_tags pt ON t.tag_id = pt.tag_id
			WHERE pt.post_id = $1
			ORDER BY t.name ASC`,
			[postid]
		)

		post.tags = tagsResult.rows.map((row) => row.name)

		return {
			post
		}
	} catch (error) {
		console.error('Error loading post:', error)
		return {
			error: 'Failed to load post'
		}
	}
}
