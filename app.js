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
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 스펙 JSON 엔드포인트
app.get('/api-docs.json', (_, res) => {
    const specPath = path.join(__dirname, 'public', 'swagger.json')
    const spec = JSON.parse(fs.readFileSync(specPath, 'utf-8'))
    res.json(spec)
})

// UI는 CDN으로만 로드하는 정적 HTML 반환
app.get('/api-docs', (_, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end(`<!doctype html>
  <html>
    <head>
      <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css">
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>API Docs</title>
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
      <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-standalone-preset.js"></script>
      <script>
        SwaggerUIBundle({
          url: '/api-docs.json',
          dom_id: '#swagger-ui',
          presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
          layout: 'StandaloneLayout'
        })
      </script>
    </body>
  </html>`)
})

export default app