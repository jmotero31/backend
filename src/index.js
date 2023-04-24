import express from 'express'
import productRouter from './routes/product.routes.js'
import raizRouter from './routes/raiz.routes.js'
import userRoute from './routes/user.routes.js'
import cartRoute from './routes/cart.routes.js'
import { __dirname } from './path.js'
import multer from 'multer'
import { engine } from 'express-handlebars' //configuracion basica de handlebars
import * as path from 'path' //importo todo de path y lo llamo path para el manejo de las rutas
// import { Server } from 'socket.io'

//Configuracion express
const APP = express()
const PORT = 4000
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
       cb(null, 'src/public/img') 
    },
    filename: (req, file, cb)=>{
        cb(null, `${file.originalname}`)
    }
}) // destino de imagenes con multer



APP.engine('handlebars', engine()) // voy a usar handlebars
APP.set('view engine', 'handlebars') //setea una valor, asignar a una constatnte un valor / en mis vistas voy a implementar handlebars
APP.set('views', path.resolve(__dirname, './views')) // paht resolve concatena ruta //src mas /views  ---- dirname devuellve la carpeta actual concatena con el valor ./view
// Middleware Para trabajar con Json desde mi servidor y acceder a los query mas complejas de la url
APP.use(express.json())
APP.use(express.urlencoded({extended: true}))
const upload = (multer({storage: storage})) // instancia objeto con la conf de multer, se guarde en la ruta que especifique

//ServerIO
//const io = new Server(server)



// Rutas
APP.use('/', raizRouter)
APP.use('/product', productRouter)
APP.use('/user', userRoute)
APP.use('/cart', cartRoute)
APP.use('/',express.static(__dirname + '/public')) //express.static()defino como una carpeta publica para que el usuario pueda ver estos elementos. con 'static' termino de define que cualquier elemento que suba en la carpeta lo pueda acceder el usuario
//generar un ruta aparte para que no este todo en localhost. static representa lo que es la carpeta publica
// digo que en la direccions stactic vaya a la carpeta publica 
APP.use('/product',express.static(__dirname + '/public'))
APP.use('/cart',express.static(__dirname + '/public'))

APP.post('/upload', upload.single('product'), (req,res)=>{
    console.log(req.body)
    console.log(req.file)
    res.send('Imagen guardada')
} )
//upload.single('product') este product es la key

//Handlebars
/*
APP.get('/', (req,res) =>{
    const tutor = {
        nombre: "hola",
        email: '',
        rol:''
    }
    res.render()
})
*/
APP.listen(PORT, ()=>{
    console.log(`Server on Port ${PORT}`)
}) 