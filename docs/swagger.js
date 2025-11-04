import swaggerJSDoc from 'swagger-jsdoc'

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
    apis: ['./routes/*.js', './api/schemas/*.yaml'], // routes와 yaml 둘 다 읽기
}

export default swaggerJSDoc(options)