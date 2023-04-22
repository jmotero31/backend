import { fileURLToPath } from 'url'
import { dirname } from 'path'

export const __filename = fileURLToPath(import.meta.url) // url devuelve el nombre del archivo 
export const __dirname = dirname(__filename) // en base a ese nombre devuelve el directorio de ese archivo. Es decir devuelve el directorio actual del cual lo estoy consultando
