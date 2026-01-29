import pool from '$lib/server/db.js'

export async function load({ url }) {
	// Support multiple tags: ?tag=art&tag=digital or ?tag=art,digital
	let tags = url.searchParams.getAll('tag')
	// Also split comma-separated values
	tags = tags.flatMap((t) => t.split(',').map((s) => s.trim().toLowerCase())).filter(Boolean)
	// Remove duplicates
	tags = [...new Set(tags)]

	try {
		// Fetch all popular tags sorted by usage
		const allTagsResult = await pool.query(
			`SELECT t.name AS tag, COUNT(*) AS usage_count
			FROM post_tags pt
			JOIN tags t ON pt.tag_id = t.tag_id
			GROUP BY t.name
			ORDER BY usage_count DESC
			LIMIT 30`
		)

		let result

		if (tags.length > 0) {
			// Filter posts that have ALL specified tags (AND logic)
			const placeholders = tags.map((_, i) => `$${i + 1}`).join(', ')
			result = await pool.query(
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
				WHERE p.post_id IN (
					SELECT pt.post_id
					FROM post_tags pt
					JOIN tags t ON pt.tag_id = t.tag_id
					WHERE LOWER(t.name) IN (${placeholders})
					GROUP BY pt.post_id
					HAVING COUNT(DISTINCT LOWER(t.name)) = $${tags.length + 1}
				)
				ORDER BY l.like_count DESC, p.created_at DESC`,
				[...tags, tags.length]
			)
		} else {
			// All recent posts
			result = await pool.query(
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
				WHERE p.created_at >= NOW() - INTERVAL '7 days'
				ORDER BY l.like_count DESC, p.created_at DESC`
			)
		}

		return {
			posts: result.rows,
			tags: tags.length > 0 ? tags : [],
			allTags: allTagsResult.rows
		}
	} catch (error) {
		console.error('Error loading posts:', error)
		return {
			posts: [],
			tags: tags.length > 0 ? tags : [],
			allTags: []
		}
	}
}
