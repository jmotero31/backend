import express from 'express'
import productRouter from './routes/product.routes.js'
import raizRouter from './routes/raiz.routes.js'
import userRoute from './routes/user.routes.js'
import cartRoute from './routes/cart.routes.js'
import chatRoute from './routes/chat.routes.js'
import sessionRouter from './routes/session.routes.js'
import loggerRouter from './routes/logger.routes.js'
import { __dirname } from './path.js'
import { engine } from 'express-handlebars' //configuracion basica de handlebars
import * as path from 'path' //importo todo de path y lo llamo path para el manejo de las rutas
import { Server } from 'socket.io' // genero mi servidor para enviar informacion
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import initializePassport from './config/passport.js'
import config from './config/config.js' // vos vas a manejar las variables de entorno para poder modificarlas dependiendo en que condiciones estemos debug, developer, admin
import './config/dbConfig.js' // ejecuto la conexion a la base de datos
import errorHandler from './middlewares/error.js'
import logger from './utils/logger.js'
import swaggerUiExpress from 'swagger-ui-express'
import { spec } from './config/doc.js'

const APP = express()

const server = APP.listen(config.port || 4000, ()=>{
    console.log(`Server on Port ${config.port || 4000}`)
}) 

APP.engine('handlebars', engine()) // voy a usar handlebars
APP.set('view engine', 'handlebars') //setea una valor, asignar a una constatnte un valor / en mis vistas voy a implementar handlebars
APP.set('views', path.resolve(__dirname, './views')) // paht resolve concatena ruta //src mas /views  ---- dirname devuellve la carpeta actual concatena con el valor ./view
// Middleware Para trabajar con Json desde mi servidor y acceder a los query mas complejas de la url y el servidor pueda entender. Cuando nos llegue informacion por body o params entienda los que se le pase como datos
APP.use(express.json())
APP.use(express.urlencoded({extended: true}))
// Configuracion de Cookkies 
APP.use(cookieParser(config.cookie_secret)) // firmo las cookies
APP.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongo_url_atlas, //mongodb://localhost:PORT
        mongoOptions: { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        },
        ttl: 210 // cuanto tiempo que dura la session 210
    }),
    secret: config.session_secret,
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge:36000}
}))
//------------------------------------------------------------------------------------------------------------------------------
//Operero con PASSPORT
//------------------------------------------------------------------------------------------------------------------------------
initializePassport()
APP.use(passport.initialize())
APP.use(passport.session())
//ServerIO establezco la configuracion
const io = new Server(server, { cors: {origin: '*'}})  // necesita saber en que servidor me estoy conectando
APP.use((req, res, next)=>{
    req.io = io 
    return next()
})
// Rutas
APP.use(errorHandler)
//APP.use(addLogger) // otra forma de utilizar el middlebar, igualmente deje todo detallado en el logger ademas de los comandos 
APP.use(logger)
APP.use('/', raizRouter)
APP.use('/product', productRouter)
APP.use('/user', userRoute)
APP.use('/cart', cartRoute)
APP.use('/chat', chatRoute)
APP.use('/session', sessionRouter)
APP.use('/loggerTest', loggerRouter)
APP.use('/doc', swaggerUiExpress.serve, swaggerUiExpress.setup(spec))
APP.use('/',express.static(__dirname + '/public')) //express.static()defino como una carpeta publica para que el usuario pueda ver estos elementos. con 'static' termino de define que cualquier elemento que suba en la carpeta lo pueda acceder el usuario
//generar un ruta aparte para que no este todo en localhost. static representa lo que es la carpeta publica
// digo que en la direccions stactic vaya a la carpeta publica 
APP.use('/product',express.static(__dirname + '/public'))
APP.use('/cart',express.static(__dirname + '/public'))
APP.use('/',express.static(__dirname + '/public'))
APP.use('/user',express.static(__dirname + '/public'))