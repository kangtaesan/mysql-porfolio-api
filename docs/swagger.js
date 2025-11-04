import swaggerJSDoc from 'swagger-jsdoc'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Portfolio API Docs',
            version: '1.0.0',
            description: 'MySQL + Express API Documentation',
        },
        servers: [{ url: '/' }],
    },
    apis: [
        path.join(__dirname, '../routes/*.js'),
        path.join(__dirname, '../api/schemas/*.yaml')
    ], // routes와 yaml 둘 다 읽기
}

export default swaggerJSDoc(options)