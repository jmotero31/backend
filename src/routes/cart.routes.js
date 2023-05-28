import { Router } from "express";
//import { cartManager } from "../CartManager.js";
import { cartModel } from "../models/Cart.js"
import { productModel } from "../models/Products.js"

const cartRoute = Router()
cartRoute.get('/', async (req, res)=>{
    try {
        const carrito = await cartModel.find({},{__v: 0})
        //const carrito = await cartModel.find({},{__v: 0}).populate('products.id_prod') como cree un pre en el model ya viene todo relacionado con el find
        const adapCarrito = carrito.map((p)=>p.toJSON())
        console.log(adapCarrito[0].products)
        //console.log(carrito)
        //console.log(carrito[0].products)
        res.render('cart', adapCarrito[0])       
    } catch (error) {
        res.send(error)
    }
})
cartRoute.post('/', async(req,res) =>{
    try {
        await cartModel.create({})
        res.send('Carrito creado')
    } catch (error) {
        res.send(error) 
    }
})
cartRoute.get('/:cid', async (req, res)=>{
    try {
        let cid = req.params.cid
        //console.log(cid)
        const carritoCid = await cartModel.findOne({_id: cid}, {_id: 0, __v: 0}) // objeto
        //console.log(carritoCid.products[0].id_prod.title)
        //console.log(carritoCid.products)
        //const adapCarritoCid = carritoCid.map((p)=>p.toJSON())
        const valor = carritoCid.products.map((p)=>p.toJSON())
        //console.log(valor)
        //res.send(adapCarritoCid) 
        
        //res.render('cart',{car: adapCarrito[0].products})  
        res.render('cart', {car: valor})  
    } catch (error) {
        res.send(error)
    }
})

cartRoute.post('/:cid/product/:pid', async (req, res)=>{
    try {
        let cid = req.params.cid   
        let pid = req.params.pid
        let {quantity} = req.body
        const carritoCid = await cartModel.findOne({_id: cid}) // objeto carrito
        //console.log(carritoCid)
        const productoPid = await productModel.findOne({_id: pid}) // objeto producto
        //console.log(productoPid.stock)
        //console.log(productoPid)
        if(productoPid && carritoCid){
            //console.log(carritoCid)
            const valor = carritoCid.products.find(car => car.id_prod == pid)
            if(valor){
                if(quantity < productoPid.stock){
                    //sumar cantidad
                    //console.log(`sumar cantidad`)
                    const indexProductoId = carritoCid.products.findIndex(car => car.id_prod == pid)
                    //console.log(indexProductoId)
                    carritoCid.products[indexProductoId].cant = valor.cant + quantity
                    //console.log(carritoCid)
                    await cartModel.updateOne({_id: cid}, carritoCid)
                    await productModel.updateOne({_id: pid}, {stock: productoPid.stock - quantity })
                    res.send(carritoCid)
                }else{
                    //la cantidad es superior al stock
                    //console.log(`la cantidad es superior al stock`)
                    res.send(`la cantidad es superior al stock`)
                }
            }else{
                //Se agrego un producto que no estaba en el carrito
                if(quantity < productoPid.stock){
                    //console.log(`Se agrego un producto que no estaba en el carrito`)
                    carritoCid.products.push({id_prod: pid, cant: quantity})
                    await cartModel.updateOne({_id: cid}, carritoCid)
                    await productModel.updateOne({_id: pid}, {stock: productoPid.stock - quantity })
                    res.send(carritoCid)
                }else{
                    //No podes ingresar un producto al carrito si la cantidad es superior a el stock declarado
                    res.send(`No hay stock suficiente para ingresar producto al carrito.`)
                }
            }
        
            //console.log(valor.cant)
            //res.send(valor)
        }else{
            console.log(`no existe carro o producto`)// no existe carro o prooducto
            res.send(`no existe carro o producto`)
        }    
           /*     
                if(productoPid.stock >= quantity){
                    res.send(`No hay Cantidad suficiente de ese producto`)
                }else{
                    carritoCid.products.push({id_prod: pid, cant: quantity})
                    await cartModel.updateOne({_id: cid}, carritoCid)
                    res.send(carritoCid)
                }
                //res.send(`No existe PRODUCTO con ese id: ${pid}`)
             */ 
       
        //console.log(productoCid)
        //console.log(productoCid)
        //console.log(productoCid.products)
        /*
        producto.push({id_prod: pid, cant: quantity})
        await cartModel.create({products: producto})
        res.send(await cartModel.find({},{_id: 0, __v: 0}))
        */
    } catch (error) {
        res.send(error)
    }
})

export default cartRoute


/*
const carrito = new cartManager('./carro.txt')

cartRoute.get('/', async (req, res)=>{
    try {
        res.render('cart',{
            dondeEstas: 'Se encuentra en la seccion CARRITO'
        })    
    } catch (error) {
        res.send(error)
    }
})
cartRoute.post('/', async(req,res) =>{
    try {
        const car = await carrito.createCart()
        res.send(car)
    } catch (error) {
        res.send(error) 
    }
})
cartRoute.get('/:cid', async (req, res)=>{
    try {
        let cid = parseInt(req.params.cid)
        const productoCid = await carrito.getCartById(cid)
        //res.send(JSON.stringify(productoCid))  
        res.render('cart', {carrito: productoCid})  
    } catch (error) {
        res.send(error)
    }
})
cartRoute.post('/:cid/product/:pid', async (req, res)=>{
    try {
        let cid = parseInt(req.params.cid) 
        let pid = parseInt(req.params.pid)
        let {quantity} = req.body
        //const respuesta = await carrito.addCartProduct(cid, pid, quantity, stock)
        res.send(await carrito.addCartProduct(cid, pid, quantity))
    } catch (error) {
        res.send(error)
    }
})
*/