import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express';

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'WMS (Workshop Management System',
            version: '1.0.0',
            description: 'Documentation for WMS (Workshop Documentation System API built with Node.js, Express, TypeScript, and Prisma',
        }
    },
    apis: ['./src/routes/*.ts']
}

const specs = swaggerJSDoc(options);

export default specs;

export const swaggerUIHandler = swaggerUI.serve
export const swaggerUIMiddleware = swaggerUI.setup(specs)