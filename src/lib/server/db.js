import pg from 'pg'
import { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } from '$env/static/private'

const pool = new pg.Pool({
	host: DB_HOST,
	port: DB_PORT,
	database: DB_NAME,
	user: DB_USER,
	password: DB_PASSWORD
})

export default pool
