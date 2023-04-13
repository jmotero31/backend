import express from 'express'
import { ProductManager } from './ProductManager.js'

const APP = express()
const PORT = 4000
APP.use(express.urlencoded({extended: true}))

const produ = new ProductManager('./bd.txt')

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

APP.listen(PORT, ()=>{
    console.log(`Server on Port ${PORT}`)
})
