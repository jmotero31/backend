import express, { application } from 'express'
import { ProductManager, Producto } from './ProductManager.js'

const APP = express()
const PORT = 4000
APP.use(express.json())
APP.use(express.urlencoded({extended: true}))

const prod1 = new Producto('uno', 'description1', 'price1', 'thumbnail1', 'code1', 'stock1')
const prod2 = new Producto('dos', 'description2', 'price2', 'thumbnail2', 'code2','stock2')
const prod3 = new Producto('tres', 'description3', 'price3', 'thumbnail3', 'code3','stock3')
const prod4 = new Producto('cuatro', 'description4', 'price4', 'thumbnail4', 'code4','stock4')
const prod5 = new Producto('cinco', 'description5', 'price5', 'thumbnail5', 'code5','stock5')
const prod6 = new Producto('seis', 'description6', 'price6', 'thumbnail6', 'code6','stock6')
const prod7 = new Producto('siete', 'description7', 'price7', 'thumbnail7', 'code7','stock7')
const prod8 = new Producto('ocho', 'description8', 'price8', 'thumbnail8', 'code8','stock8')
const produ = new ProductManager('./bd.txt')
await produ.addProduct(prod1)
await produ.addProduct(prod2)
await produ.addProduct(prod3)
await produ.addProduct(prod4)
await produ.addProduct(prod5)
await produ.addProduct(prod6)
await produ.addProduct(prod7)
await produ.addProduct(prod8)

APP.get('/', async (req, res)=>{
    res.send('Bienvenido al servidor que hasta ahora esta FOUND')
})

APP.get('/products', async (req, res)=>{
    let limit = req.query.limit
    const producto = await produ.getProdcuts()
    if(limit){
        const productoLimite = producto.slice(0, parseInt(limit))
        res.send(JSON.stringify(productoLimite))
    }else{
        res.send(JSON.stringify(producto))
    }
})

APP.get('/products/:pid', async (req, res)=>{
    let pid = parseInt(req.params.pid)
    const producto = await produ.getProdcuts()
    const productoId = producto.find(pro => pro.id === pid)
    if(productoId){
        res.send(JSON.stringify(productoId))
    }else{
        res.send(`No existe producto con ese Identificador = ${pid}`)
    }
})

APP.post('/products', async (req, res)=>{
    const { title, description, price, thumbnail, code, stock } = req.body
    const objNuevo = { title: title, description: description, price: price, thumbnail: thumbnail, code: code, stock: stock}
    const agregar = await produ.addProduct(objNuevo)
    res.send(agregar)
})

APP.put('/products/:puid', async (req, res) => {
    let puid = parseInt(req.params.puid)
    //const { title, description, price, thumbnail, code, stock } = req.body
    const objetoUpdat = req.body
    const update = await produ.updateProduct(puid, objetoUpdat)
    res.send(update)
})

APP.delete('/products/:did', async(req, res)=>{
    let pdid = parseInt(req.params.did)
    const dele = await produ.deleteProduct(pdid)
    res.send(dele)
})

APP.listen(PORT, ()=>{
    console.log(`Server on Port ${PORT}`)
})


