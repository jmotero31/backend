import express from 'express'
import { ProductManager } from './ProductManager.js'

const APP = express()
const PORT = 4000
APP.use(express.urlencoded({extended: true}))

const produ = new ProductManager()


APP.get('/user', async (req, res)=>{
    //res.send('hola')
    const producto = await produ.getProdcuts()
    //console.log(producto)
    res.send(JSON.stringify(producto))
})

APP.listen(PORT, ()=>{
    console.log(`Server on Port ${PORT}`)
})
