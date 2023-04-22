import { Router } from "express";
import { ProductManager, Producto } from "../ProductManager.js";


const productRouter = Router()
const produ = new ProductManager('./productos.txt')

//Genero productos y adjunto a la base de datos temporal TXT
const prod1 = new Producto('Set Juego De Llaves Tubos', 'Set Juego De Llaves Tubos Y Puntas Combinadas 108 Pza Valija', '23000', 'true', '20', 'Herramientas', 'thumbnail1', 'code1')
const prod2 = new Producto('Caja De Herramientas Makita 24', 'sta caja Makita CH24 te brindará el espacio, la comodidad y practicidad ', '15900', 'true', '15', 'Herramientas', 'thumbnail2', 'code2')
const prod3 = new Producto('Celular Motorola Moto E13 64gb', 'El nuevo Moto E13 que tiene un diseño fino, ligero y llamativo', '48899', 'true', '13', 'Tecnologia', 'thumbnail3', 'code3')
const prod4 = new Producto('Canon EOS Rebel Kit T100', 'Canon combina calidad y rendimiento en sus productos.', '246999', 'true', '8', 'Tecnologia', 'thumbnail4', 'code4')
const prod5 = new Producto('Zapatillas Jaguar Oficial', 'DEPORTIVA LIVIANA DE PVC MONOCOLOR, RESISTENTE', '5825', 'true', '32', 'Deportes', 'thumbnail5', 'code5')
const prod6 = new Producto('Nemeziz Messi 19.4 Fxg J Azul adidas', 'Nemeziz Messi 19.4 Fxg J es un nuevo producto para Niños de adidas. ', '20599', 'true', '12', 'Deportes', 'thumbnail6', 'code6')
const prod7 = new Producto('Secador de pelo BaBylissPRO Academy B6172 negro 220V', 'Si hay algo que no puede faltar en tu baño es un secador de pelo BaBylissPRO Academy', '30990', 'true', '14', 'Belleza', 'thumbnail7', 'code7')
const prod8 = new Producto('Planchita de pelo BaBylissPRO Nano Titanium Iónica Digital BABNT2091T azul 220V', 'Conseguí un lacio perfecto con la planchita BaBylissPRO Iónica Digital. Con su tecnología y calidad vas a lucir tus looks siempre impecables.', '45990', 'true', '9', 'Belleza', 'thumbnail8', 'code8')
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