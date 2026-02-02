import pool from '$lib/server/db.js'

export async function load({ url }) {
	// Support multiple tags: ?tag=art&tag=digital or ?tag=art,digital
	let tags = url.searchParams.getAll('tag')
	// Also split comma-separated values
	tags = tags.flatMap((t) => t.split(',').map((s) => s.trim().toLowerCase())).filter(Boolean)
	// Remove duplicates
	tags = [...new Set(tags)]

	// Get search query
	const search = url.searchParams.get('search')?.trim() || ''
	
	// Get NSFW filter (default: hide NSFW)
	const showMature = url.searchParams.get('mature') === 'true'

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
		const params = []
		let paramCount = 1
		
		// Build WHERE conditions
		const conditions = []
		
		// NSFW filter
		if (!showMature) {
			conditions.push(`(p.mature_content = FALSE OR p.mature_content IS NULL)`)
		}
		
		// Search filter
		if (search) {
			conditions.push(`(
				LOWER(p.title) LIKE $${paramCount} OR 
				LOWER(u.username) LIKE $${paramCount}
			)`)
			params.push(`%${search.toLowerCase()}%`)
			paramCount++
		}

		if (tags.length > 0) {
			// Filter posts that have ALL specified tags (AND logic)
			const tagPlaceholders = tags.map((_, i) => `$${paramCount + i}`).join(', ')
			params.push(...tags, tags.length)
			
			const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''
			
			result = await pool.query(
				`SELECT 
					p.post_id,
					p.title,
					p.file_url,
					p.mature_content,
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
					WHERE LOWER(t.name) IN (${tagPlaceholders})
					GROUP BY pt.post_id
					HAVING COUNT(DISTINCT LOWER(t.name)) = $${paramCount + tags.length}
				)
				${conditions.length > 0 ? `AND ${conditions.join(' AND ')}` : ''}
				ORDER BY l.like_count DESC, p.created_at DESC`,
				params
			)
		} else {
			// All recent posts
			const whereClause = conditions.length > 0 ? `AND ${conditions.join(' AND ')}` : ''
			
			result = await pool.query(
				`SELECT 
					p.post_id,
					p.title,
					p.file_url,
					p.mature_content,
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
				${whereClause}
				ORDER BY l.like_count DESC, p.created_at DESC`,
				params
			)
		}

		return {
			posts: result.rows,
			tags: tags.length > 0 ? tags : [],
			allTags: allTagsResult.rows,
			search,
			showMature
		}
	} catch (error) {
		console.error('Error loading posts:', error)
		return {
			posts: [],
			tags: tags.length > 0 ? tags : [],
			allTags: [],
			search: '',
			showMature: false
		}
	}
}
