import swaggerJSDoc from 'swagger-jsdoc'

const baseUrl = process.env.BASE_URL || '/'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Portfolio API Docs',
            version: '1.0.0',
            description: 'MySQL + Express API Documentation',
        },
        servers: [{ url: baseUrl }],
    },
    apis: ['./routes/*.js', './schemas/*.yaml'], // routes와 yaml 둘 다 읽기
}

export default swaggerJSDoc(options)