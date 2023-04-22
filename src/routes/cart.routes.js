import { Router, json } from "express";
import { cartManager } from "../CartManager.js";

const cartRoute = Router()
const carrito = new cartManager('./carro.txt')

cartRoute.get('/', async (req, res)=>{
    try {
        res.send('Se encuentra en la seccion CARRITO')    
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
        //console.log(productoCid)
        res.send(JSON.stringify(productoCid))    
    } catch (error) {
        res.send(error)
    }
})
cartRoute.post('/:cid/product/:pid', async (req, res)=>{
    try {
        let cid = parseInt(req.params.cid) 
        let pid = parseInt(req.params.pid)
        let {quantity , stock} = req.body
        //const respuesta = await carrito.addCartProduct(cid, pid, quantity, stock)
        res.send(await carrito.addCartProduct(cid, pid, quantity))
    } catch (error) {
        res.send(error)
    }
})

export default cartRoute