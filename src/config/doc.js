import swaggerJSDoc from 'swagger-jsdoc'
import { __dirname } from '../path.js'

const swaggerOptions = {
    definition:{
        openapi: '3.0.1',
        info:{
            title: 'Documentacion de la API',
            description: 'Informacion detallada sobre endpoint',
            version: '1.0.0',
            contact:{
                name: 'Juan Martin Otero',
                url: 'linkeding'
            }
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}
export const spec = swaggerJSDoc(swaggerOptions) // constante de espera