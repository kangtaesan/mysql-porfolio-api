import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import postsRouter from './routes/posts.js'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './docs/swagger.js'

// .env 읽기
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'https://localhost:5173',
    credentials: true
}))

// 게시글 api
app.use('/api/v1/posts', postsRouter)

// 기본 라우트(테스트)
app.get('/', (req, res) => {
    res.send('MySQL + Express API Server is running')
})

// 에러 핸들러
app.use((err, req, res, next) => {
    console.error(err)
    res.status(err.status || 500).json({ message: err.message || 'Server Error' })
})
app.use((err, req, res, next) => {
    next(createError(404))
})

// 로컬 개발 시 app.listen() = 자체적으로 서버 소켓을 열어 포트 점유
// Vercel(서버리스)는 직접 포트 바인딩 x
// const PORT = process.env.PORT || 3000
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`)
// })

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app