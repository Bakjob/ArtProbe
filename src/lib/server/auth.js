import bcrypt from 'bcrypt'
import { randomUUID } from 'crypto'
import pool from './db.js'

/**
 * Register a new user
 *
 * @param {string} username
 * @param {string} password
 * @param {string} email
 * @returns {Promise<{success: boolean, error?: string, userId?: string}>}
 */
export async function registerUser(username, password, email) {
	// Validate input
	if (!username || !password || !email) {
		return { success: false, error: 'Username, password and email are required' }
	}

	if (username.length < 3) {
		return { success: false, error: 'Username must be at least 3 characters' }
	}

	if (password.length < 6) {
		return { success: false, error: 'Password must be at least 6 characters' }
	}

	try {
		// Check if user already exists
		const existingUser = await pool.query(
			'SELECT user_id FROM users WHERE username = $1 OR email = $2',
			[username, email]
		)

		if (existingUser.rows.length > 0) {
			return { success: false, error: 'Username or email already exists' }
		}

		// Generate UUID and hash password
		const userId = randomUUID()
		const passwordHash = await bcrypt.hash(password, 10)

		// Insert user
		const result = await pool.query(
			'INSERT INTO users (user_id, username, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING user_id',
			[userId, username, email, passwordHash]
		)

		return { success: true, userId: result.rows[0].user_id }
	} catch (error) {
		console.error('Registration error:', error)
		return { success: false, error: 'Server error during registration' }
	}
}

/**
 * Login user and create session
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{success: boolean, error?: string, sessionId?: string, userId?: string}>}
 */
export async function loginUser(username, password) {
	if (!username || !password) {
		return { success: false, error: 'Username and password are required' }
	}

	try {
		// Get user from database
		const result = await pool.query(
			'SELECT user_id, password_hash FROM users WHERE username = $1',
			[username]
		)

		if (result.rows.length === 0) {
			return { success: false, error: 'Invalid username or password' }
		}

		const user = result.rows[0]

		// Verify password
		const validPassword = await bcrypt.compare(password, user.password_hash)

		if (!validPassword) {
			return { success: false, error: 'Invalid username or password' }
		}

		// Create session
		const sessionId = randomUUID()
		const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

		await pool.query('INSERT INTO sessions (id, user_id, expires_at) VALUES ($1, $2, $3)', [
			sessionId,
			user.user_id,
			expiresAt
		])

		return { success: true, sessionId, userId: user.user_id }
	} catch (error) {
		console.error('Login error:', error)
		return { success: false, error: 'Server error during login' }
	}
}

/**
 * Logout user by deleting session
 * @param {string} sessionId
 * @returns {Promise<{success: boolean}>}
 */
export async function logoutUser(sessionId) {
	if (!sessionId) {
		return { success: false }
	}

	try {
		await pool.query('DELETE FROM sessions WHERE id = $1', [sessionId])
		return { success: true }
	} catch (error) {
		console.error('Logout error:', error)
		return { success: false }
	}
}

/**
 * Get user by session ID
 * @param {string} sessionId
 * @returns {Promise<{user_id: string, username: string, email: string} | null>}
 */
export async function getUserBySession(sessionId) {
	if (!sessionId) {
		return null
	}

	try {
		const result = await pool.query(
			`SELECT u.user_id, u.username, u.email
       FROM sessions s 
       JOIN users u ON s.user_id = u.user_id
       WHERE s.id = $1 AND s.expires_at > NOW()`,
			[sessionId]
		)

		if (result.rows.length === 0) {
			return null
		}

		return result.rows[0]
	} catch (error) {
		console.error('Get user by session error:', error)
		return null
	}
}
