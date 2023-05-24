import { Router } from "express";
//import { ProductManager, Producto } from "../ProductManager.js";
import { productModel } from "../models/Products.js";

const productRouter = Router()
/*
await productModel.create([
    {title:'Set Juego De Llaves Tubos', description: 'Set Juego De Llaves Tubos Y Puntas Combinadas 108 Pza Valija', price: 23000, status: 'true', stock: 20, category: 'Herramientas', thumbmail: 'thumbnail1', code: 'code1'},
    {title:'Caja De Herramientas Makita 24', description: 'Esta caja Makita CH24 te brindará el espacio, la comodidad y practicidad', price: 15900, status: 'true', stock: 20, category: 'Herramientas', thumbmail: 'thumbnail2', code: 'code2'},
    {title:'Celular Motorola Moto E13 64gb', description: 'El nuevo Moto E13 que tiene un diseño fino, ligero y llamativo', price: 48899, status: 'true', stock: 20, category: 'Tecnologia', thumbmail: 'thumbnail3', code: 'code3'},
    {title:'Canon EOS Rebel Kit T100', description: 'Canon combina calidad y rendimiento en sus productos', price: 246999, status: 'true', stock: 20, category: 'Tecnologia', thumbmail: 'thumbnail4', code: 'code4'},
    {title:'Zapatillas Jaguar Oficial', description: 'DEPORTIVA LIVIANA DE PVC MONOCOLOR, RESISTENTE', price: 5825, status: 'true', stock: 20, category: 'Deportes', thumbmail: 'thumbnail5', code: 'code5'},
    {title:'Nemeziz Messi 19.4 Fxg J Azul adidas', description: 'Nemeziz Messi 19.4 Fxg J es un nuevo producto para Niños de adidas', price: 20599, status: 'true', stock: 20, category: 'Deportes', thumbmail: 'thumbnail6', code: 'code6'},
    {title:'Secador de pelo BaBylissPRO Academy B6172 negro 220V', description: 'Si hay algo que no puede faltar en tu baño es un secador de pelo BaBylissPRO Academy', price: 30990, status: 'true', stock: 20, category: 'Belleza', thumbmail: 'thumbnail7', code: 'code7'},
    {title:'Planchita de pelo BaBylissPRO Nano Titanium Iónica Digital BABNT2091T azul 220V', description: 'Conseguí un lacio perfecto con la planchita BaBylissPRO Iónica Digital. Con su tecnología y calidad vas a lucir tus looks siempre impecables', price: 45990, status: 'true', stock: 20, category: 'Belleza', thumbmail: 'thumbnail8', code: 'code8'}
])
*/
productRouter.get('/', async (req, res)=>{
    try {
        let limite = req.query.limit
        //console.log(limite)
        const producto = await productModel.find({},{__v: 0})
        //console.log(producto)
        if(limite){
            const productoLimite = await productModel.find({},{_id: 0, __v: 0}).limit(limite)  
            const adapProductoLimite = productoLimite.map((p)=>p.toJSON())
            //console.log(productoLimite)    
            res.render('product', { pro: adapProductoLimite})
            //res.send(productoLimite)
        }else{
            const adapProducto = producto.map((p)=>p.toJSON())
            //res.send(producto)
           console.log(adapProducto)
            res.render('product',{ pro: adapProducto})
        }       
    } catch (error) {
        res.send(error)
    }
})
productRouter.get('/:pid', async (req, res)=>{
    try {
        let pid = req.params.pid      
        const productoId = await productModel.findOne({_id: pid}, {_id: 0, __v: 0})
        const adapProductoId = productoId.map((p)=>p.toJSON())
        ///console.log(productoId)       
        if(productoId){
            //res.send(productoId)
            res.render('product', {producto: adapProductoId})
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
        setTimeout(async()  =>{
            await productModel.insertMany(objNuevo)
            res.redirect('product')             
          }, 1000);       
    } catch (error) {
        res.send(error)
    }
})
productRouter.put('/:puid', async (req, res) => {
    try {
        let puid = req.params.puid
        //const { title, description, price, thumbnail, code, stock } = req.body
        const objetoUpdat = req.body
        await productModel.updateOne({_id: puid}, objetoUpdat)
        res.send(objetoUpdat)     
    } catch (error) {
        res.send(error)
    }
})
productRouter.delete('/:did', async(req, res)=>{
    try {
        let pdid = req.params.did
        await productModel.deleteOne({_id: pdid})
        res.send(dele)   
    } catch (error) {
        res.send(error)
    }
})

export default productRouter
