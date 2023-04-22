import { Router } from "express";
import { ProductManager, Producto } from "../ProductManager.js";


const productRouter = Router()
const produ = new ProductManager('./productos.txt')

//Genero productos y adjunto a la base de datos temporal TXT
const prod1 = new Producto('uno', 'description1', 'price1', 'true', 'stock1', 'category1', 'thumbnail1', 'code1')
const prod2 = new Producto('dos', 'description2', 'price2', 'true', 'stock2', 'category2', 'thumbnail2', 'code2')
const prod3 = new Producto('tres', 'description3', 'price3', 'true', 'stock3', 'category3', 'thumbnail3', 'code3')
const prod4 = new Producto('cuatro', 'description4', 'price4', 'true', 'stock4', 'category4', 'thumbnail4', 'code4')
const prod5 = new Producto('cinco', 'description5', 'price5', 'true', 'stock5', 'category5', 'thumbnail5', 'code5')
const prod6 = new Producto('seis', 'description6', 'price6', 'true', 'stock6', 'category6', 'thumbnail6', 'code6')
const prod7 = new Producto('siete', 'description7', 'price7', 'true', 'stock7', 'category7', 'thumbnail7', 'code7')
const prod8 = new Producto('ocho', 'description8', 'price8', 'true', 'stock8', 'category8', 'thumbnail8', 'code8')
await produ.addProduct(prod1)
await produ.addProduct(prod2)
await produ.addProduct(prod3)
await produ.addProduct(prod4)
await produ.addProduct(prod5)
await produ.addProduct(prod6)
await produ.addProduct(prod7)
await produ.addProduct(prod8)


//Rutas del Proyecto

productRouter.get('/', async (req, res)=>{
    try {
        let limit = req.query.limit
        const producto = await produ.getProdcuts()
        if(limit){
            const productoLimite = producto.slice(0, parseInt(limit))
            res.send(JSON.stringify(productoLimite))
        }else{
            res.send(JSON.stringify(producto))
        }       
    } catch (error) {
        res.send(error)
    }
})

productRouter.get('/:pid', async (req, res)=>{
    try {
        let pid = parseInt(req.params.pid)
        const producto = await produ.getProdcuts()
        const productoId = producto.find(pro => pro.id === pid)
        if(productoId){
            res.send(JSON.stringify(productoId))
        }else{
            res.send(`No existe producto con ese Identificador = ${pid}`)
        }      
    } catch (error) {
        res.send(error)
    }
})

productRouter.post('/', async (req, res)=>{
    try {
        const { title, description, price, status, stock, category, thumbnail, code } = req.body
        const objNuevo = { title: title, description: description, price: price, status: status, stock: stock, category: category, thumbnail: thumbnail, code: code}
        const agregar = await produ.addProduct(objNuevo)
        res.send(agregar)  
    } catch (error) {
        res.send(error)
    }
})

productRouter.put('/:puid', async (req, res) => {
    try {
        let puid = parseInt(req.params.puid)
        //const { title, description, price, thumbnail, code, stock } = req.body
        const objetoUpdat = req.body
        const update = await produ.updateProduct(puid, objetoUpdat)
        res.send(update)     
    } catch (error) {
        res.send(error)
    }
})

productRouter.delete('  /:did', async(req, res)=>{
    try {
        let pdid = parseInt(req.params.did)
        const dele = await produ.deleteProduct(pdid)
        res.send(dele)   
    } catch (error) {
        res.send(error)
    }
})

export default productRouter