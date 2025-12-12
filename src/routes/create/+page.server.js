import pool from '$lib/server/db.js'
import { json } from '@sveltejs/kit'
import { r2 } from '$lib/server/r2.js'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import crypto from 'crypto'

export async function load() {
	try {
		const result = await pool.query(
			`SELECT name FROM tags ORDER BY name ASC`
		)

		const tags = result.rows.map(row => row.name)
		
		return { tags }
	} catch (error) {
		console.error('Error fetching tags:', error)
		return { tags: [], error: 'Failed to fetch tags' }
	}
}

export async function actions({ request, cookies }) {
	try {
		// Check if user is logged in
		const sessionId = cookies.get('session_id')
		if (!sessionId) {
			return json({ message: 'Unauthorized' }, { status: 401 })
		}

		// Get user from session
		const sessionResult = await pool.query(
			`SELECT user_id FROM sessions WHERE id = $1 AND expires_at > NOW()`,
			[sessionId]
		)

		if (sessionResult.rows.length === 0) {
			return json({ message: 'Unauthorized' }, { status: 401 })
		}

		const userId = sessionResult.rows[0].user_id

		// Parse form data
		const formData = await request.formData()
		const title = formData.get('title')
		const description = formData.get('description')
		const tagsJson = formData.get('tags')
		const imageFile = formData.get('image')

		if (!title || !description || !imageFile) {
			return json({ message: 'Missing required fields' }, { status: 400 })
		}

		const tags = tagsJson ? JSON.parse(tagsJson) : []

		// Upload image to R2
		const fileExtension = imageFile.name.split('.').pop()
		const fileName = `${crypto.randomUUID()}.${fileExtension}`
		const fileBuffer = await imageFile.arrayBuffer()

		await r2.send(
			new PutObjectCommand({
				Bucket: 'artprobe',
				Key: `posts/${fileName}`,
				Body: Buffer.from(fileBuffer),
				ContentType: imageFile.type
			})
		)

		// Store the S3 key path, not a public URL
		const fileUrl = `posts/${fileName}`

		// Insert post into database
		const postResult = await pool.query(
			`INSERT INTO posts (user_id, file_url, title, likes, created_at)
			 VALUES ($1, $2, $3, 0, NOW())
			 RETURNING post_id`,
			[userId, fileUrl, title]
		)

		const postId = postResult.rows[0].post_id

		// Insert tags
		for (const tagName of tags) {
			// Insert tag if it doesn't exist
			const tagResult = await pool.query(
				`INSERT INTO tags (name) VALUES ($1)
				 ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
				 RETURNING tag_id`,
				[tagName]
			)

			const tagId = tagResult.rows[0].tag_id

			// Link tag to post
			await pool.query(
				`INSERT INTO post_tags (post_id, tag_id) VALUES ($1, $2)
				 ON CONFLICT DO NOTHING`,
				[postId, tagId]
			)
		}

		return json({ postId, message: 'Post created successfully' }, { status: 201 })
	} catch (error) {
		console.error('Error creating post:', error)
		return json({ message: 'Failed to create post', error: error.message }, { status: 500 })
	}
}
