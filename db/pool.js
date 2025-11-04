import mysql2 from 'mysql2'
import dotenv from 'dotenv'

// .env 읽기
dotenv.config()

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: { rejectUnauthorized: false },
});

// mysql2는 promise 버전 지원 (async/await 사용 가능)
const db = pool.promise()
export default db