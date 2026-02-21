import pool from '$lib/server/db.js'

export async function load() {
	try {
		// Fetch trending tags: most used, limited to 8
		// For each tag, fetch a representative post file_url with most likes
		const trendingTags = await pool.query(
			`SELECT
				t.name AS tag,
				COUNT(*) AS usage_count,
				(
					SELECT p.file_url
					FROM post_tags pt2
					JOIN posts p ON pt2.post_id = p.post_id
					LEFT JOIN (
						SELECT post_id, COUNT(*) AS like_count
						FROM post_likes
						GROUP BY post_id
					) l ON p.post_id = l.post_id
					WHERE pt2.tag_id = t.tag_id
					ORDER BY COALESCE(l.like_count, 0) DESC, RANDOM()
					LIMIT 1
				) AS file_url
			FROM post_tags pt
			JOIN tags t ON pt.tag_id = t.tag_id
			GROUP BY t.tag_id, t.name
			ORDER BY usage_count DESC
			LIMIT 8`
		)

		// Fetch trending posts: highest likes, limited to 20
		const trendingPosts = await pool.query(
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
			LIMIT 20`
		)

		const trendingArtists = await pool.query(
			`SELECT
				u.user_id,
				u.username,
				u.avatar_url,
				COALESCE(SUM(l.like_count), 0) AS total_likes
			FROM users u
			JOIN posts p ON u.user_id = p.user_id
			LEFT JOIN (
				SELECT post_id, COUNT(*) AS like_count
				FROM post_likes
				GROUP BY post_id
			) l ON p.post_id = l.post_id
			GROUP BY u.user_id, u.username, u.avatar_url
			ORDER BY total_likes DESC
			LIMIT 100`
		)

		return {
			trendingPosts: trendingPosts.rows,
			trendingTags: trendingTags.rows,
			trendingArtists: trendingArtists.rows
		}
	} catch (error) {
		console.error('Error loading trending posts:', error)
		return {
			trendingPosts: [],
			trendingTags: [],
			trendingArtists: []
		}
	}
}
