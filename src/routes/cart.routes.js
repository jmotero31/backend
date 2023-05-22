import { Router, json } from "express";
//import { cartManager } from "../CartManager.js";
import { cartModel } from "../models/Cart.js"
import { productModel } from "../models/Products.js"

const cartRoute = Router()

cartRoute.get('/', async (req, res)=>{
    try {
        const carrito = await cartModel.find({},{__v: 0})
        console.log(carrito)
        res.send(carrito)
        /*
        res.render('cart',{
            dondeEstas: 'Se encuentra en la seccion CARRITO'
        })   
        */ 
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
        const productoCid = await cartModel.findOne({_id: cid}, {_id: 0, __v: 0}) // objeto
        res.send(productoCid) 
        //res.render('cart', {carrito: productoCid})  
    } catch (error) {
        res.send(error)
    }
})
cartRoute.post('/:cid/product/:pid', async (req, res)=>{
    try {
        let cid = req.params.cid
        //console.log(cid)
        let pid = req.params.pid
        //console.log(pid)
        let {quantity} = req.body
        //console.log(quantity)
        const productoCid = await cartModel.findOne({_id: cid}) // objeto
        const productoPid = await productModel.findOne({_id: pid})
        
        console.log(stockProducto)
        if(productoCid){
            if(productoPid){
                if(productoPid.stock >= quantity){
                    res.send(`No hay Cantidad suficiente de ese producto`)
                }else{
                    productoCid.products.push({id_prod: pid, cant: quantity})
                    await cartModel.updateOne({_id: cid}, productoCid)
                    res.send(productoCid)
            
                //res.send(`No existe PRODUCTO con ese id: ${pid}`)
            }    
        }else{
            res.send(`No existe CARRITO con es id: ${cid}`)
        }
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