import pool from '$lib/server/db.js'

export async function load() {
	try {
		// Hämta trending posts: högst likes, begränsa till 10
		const trendingResult = await pool.query(
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
			ORDER BY l.like_count DESC, p.created_at DESC
			LIMIT 10`
		)

		return {
			trendingPosts: trendingResult.rows
		}
	} catch (error) {
		console.error('Error loading trending posts:', error)
		return {
			trendingPosts: []
		}
	}
}