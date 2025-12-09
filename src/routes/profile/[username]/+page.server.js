import pool from '$lib/server/db.js'
import { error } from '@sveltejs/kit'

export async function load({ params }) {
	const { username } = params

	try {
		const profileRes = await pool.query(
			`SELECT 
				u.user_id,
				u.username,
				u.email,
				u.phone,
				u.age,
				u.gender,
				u.bio,

				-- ⭐ Total gigs
				(SELECT COUNT(*) FROM gigs g WHERE g.user_id = u.user_id) AS total_gigs,

				-- ⭐ Total orders
				(SELECT COUNT(*) FROM orders o WHERE o.seller_id = u.user_id) AS total_orders,

				-- ⭐ Avg rating
				(SELECT AVG(r.rating) FROM reviews r WHERE r.reviewee_id = u.user_id) AS avg_rating,

				-- ⭐ Total reviews
				(SELECT COUNT(*) FROM reviews r WHERE r.reviewee_id = u.user_id) AS total_reviews,

				-- ⭐ On-time delivery rate
				(
					SELECT 
						CASE 
							WHEN COUNT(*) = 0 THEN 0
							ELSE SUM(CASE WHEN d.delivered_at <= o.deadline THEN 1 ELSE 0 END)::float / COUNT(*)
						END
					FROM deliveries d
					JOIN orders o ON o.order_id = d.order_id
					WHERE o.seller_id = u.user_id
				) AS on_time_rate,

				-- ⭐ Cancellation rate
				(
					SELECT 
						CASE 
							WHEN COUNT(*) = 0 THEN 0
							ELSE SUM(CASE WHEN o.status = 'cancelled' THEN 1 ELSE 0 END)::float / COUNT(*)
						END
					FROM orders o
					WHERE o.seller_id = u.user_id
				) AS cancellation_rate,

				-- ⭐ Repeat buyers
				(
					SELECT 
						COUNT(*) 
					FROM (
						SELECT buyer_id 
						FROM orders o 
						WHERE o.seller_id = u.user_id
						GROUP BY buyer_id
						HAVING COUNT(*) > 1
					) x
				) AS repeat_buyers,

				-- ⭐ Total revenue
				(SELECT COALESCE(SUM(o.price), 0) FROM orders o WHERE o.seller_id = u.user_id) AS total_revenue,

				-- ⭐ Avg response time (minutes)
				(
					SELECT AVG(EXTRACT(EPOCH FROM (m2.created_at - m.created_at)) / 60)
					FROM messages m
					JOIN messages m2 
						ON m2.order_id = m.order_id 
						AND m2.sender_id = u.user_id 
						AND m2.created_at > m.created_at
					JOIN orders o ON o.order_id = m.order_id
					WHERE o.seller_id = u.user_id
				) AS avg_response_time,

				-- ⭐ First response time
				(
					SELECT AVG(EXTRACT(EPOCH FROM (first_seller_msg - first_buyer_msg)) / 60)
					FROM (
						SELECT 
							o.order_id,
							(SELECT MIN(m.created_at) FROM messages m WHERE m.order_id = o.order_id AND m.sender_id != u.user_id) AS first_buyer_msg,
							(SELECT MIN(m.created_at) FROM messages m WHERE m.order_id = o.order_id AND m.sender_id = u.user_id) AS first_seller_msg
						FROM orders o
						WHERE o.seller_id = u.user_id
					) sub
					WHERE first_buyer_msg IS NOT NULL AND first_seller_msg IS NOT NULL
				) AS first_response_time,

				-- ⭐ Last active
				(SELECT MAX(created_at) FROM sessions s WHERE s.user_id = u.user_id) AS last_active
			FROM users u
			WHERE u.username = $1`,
			[username]
		)

		if (profileRes.rows.length === 0) {
			throw error(404, 'User not found')
		}

		const user = profileRes.rows[0]

		const languages = await pool.query(
			`SELECT l.name, ul.proficiency
			 FROM user_languages ul
			 JOIN languages l ON ul.language_id = l.language_id
			 WHERE ul.user_id = $1`,
			[user.user_id]
		)

		const skills = await pool.query(
			`SELECT s.category_name
			 FROM user_skills us
			 JOIN skills s ON us.category_id = s.category_id
			 WHERE us.user_id = $1`,
			[user.user_id]
		)

		const portfolio = await pool.query(
			`SELECT portfolio_id, file_url, title, created_at
			 FROM portfolio_items
			 WHERE user_id = $1
			 ORDER BY created_at DESC`,
			[user.user_id]
		)

		const gigs = await pool.query(
			`SELECT gig_id, title, description, delivery_days, created_at
			 FROM gigs
			 WHERE user_id = $1
			 ORDER BY created_at DESC`,
			[user.user_id]
		)

		return {
			user,
			languages: languages.rows,
			skills: skills.rows,
			portfolio: portfolio.rows,
			gigs: gigs.rows
		}
	} catch (err) {
		console.error('Error:', err)
		throw error(500, 'Failed to load seller stats')
	}
}
