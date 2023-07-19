//import { cartModel } from "../models/Cart.js"
//import { productModel } from "../models/Products.js"
import { findOneIdCartPopulate, createCart, updateCart } from '../services/cart.services.js'
import { findOneProduct, updateOneProduct, findProduct } from "../services/product.services.js"
import { createTicket } from '../services/ticket.services.js'


export const getCartAll = async (req, res)=>{
    try {      
        const id = req.user.cart
        console.log(id)
        //const carrito = await cartModel.findOne({_id: id}, {__v: 0}).populate('products.id_prod') // objeto
        const carrito = await findOneIdCartPopulate(id)
        console.log('get', carrito)

        const valor = carrito.products.map((p)=>p.toJSON())
        
        req.cant = valor.length
        //console.log(req.cant)
        if(valor.length){valor[0].idCarrito = id}

        res.render('cart', {car: valor, idcarrito: id, valorNav: true, name:`Hola, ${req.user.first_name}` , rol: req.user.rol == 'false' ? false:true, cantidad: req.cant})       
    } catch (error) {
        res.send(error)
    }
}

export const postCreateCart = async(req,res) =>{
    try {
        const carrito = await createCart({})
        //console.log(carrito._id.toString())
        return carrito
        //res.send('Carrito creado')
    } catch (error) {
        res.send(error) 
    }
}

export const getCartId = async (req, res)=>{
    try {
        let cid = req.params.cid
        
        //const carritoCid = await cartModel.findOne({_id: cid}, {_id: 0, __v: 0}).populate('products.id_prod') // objeto
        const carritoCid = await findOneIdCartPopulate(cid)
        
        const valor = carritoCid.products.map((p)=>p.toJSON()) 
        res.render('cart', {car: valor, valorNav: true, name: requser.nombre, rol: req.user.rol})  
    } catch (error) {
        res.send(error)
    }
}

export const postAddProductInCart = async (req, res)=>{
    try {
        let cid = req.params.cid  
        let pid = req.params.pid
        const {quantity} = req.body

        //const carritoCid = await cartModel.findOne({_id: cid}) // objeto carrito
        const carritoCid = await findOneIdCartPopulate(cid)
        
        //const productoPid = await productModel.findOne({_id: pid}) // objeto producto
        const productoPid = await findOneProduct({_id: pid}, {})
        
        if(productoPid && carritoCid){
            const valor = carritoCid.products.find(car => car.id_prod == pid)
            if(valor){
                if(parseInt(quantity) <= productoPid.stock){
                    const indexProductoId = carritoCid.products.findIndex(car => car.id_prod == pid)
                    carritoCid.products[indexProductoId].cant = carritoCid.products[indexProductoId].cant + parseInt(quantity)
                    
                    //await cartModel.updateOne({_id: cid}, carritoCid)
                    await updateCart(cid, carritoCid)
                    
                    //await productModel.updateOne({_id: pid}, {stock: productoPid.stock - parseInt(quantity) })

                    // actualzicion
                    const updateProduct = await updateOneProduct({_id: pid}, {stock: productoPid.stock - parseInt(quantity) })

                    res.send(carritoCid)
                }else{
                    //la cantidad es superior al stock
                    console.log(`la cantidad es superior al stock`)
                    res.send(`la cantidad es superior al stock`)
                }
            }else{
                //Se agrego un producto que no estaba en el carrito
                if(parseInt(quantity) <= productoPid.stock){
                    carritoCid.products.push({id_prod: pid, cant: parseInt(quantity)})
                    
                    //await cartModel.updateOne({_id: cid}, carritoCid)
                    await updateCart(cid, carritoCid)

                    //await productModel.updateOne({_id: pid}, {stock: productoPid.stock - parseInt(quantity) })
                    const updateProduct = await updateOneProduct({_id: pid}, {stock: productoPid.stock - parseInt(quantity) })

                    res.send(carritoCid)
                }else{
                    //No podes ingresar un producto al carrito si la cantidad es superior a el stock declarado
                    console.log(`No hay stock suficiente para ingresar producto al carrito.`)
                    res.send(`No hay stock suficiente para ingresar producto al carrito.`)
                }
            }
        }else{
            console.log(`no existe carro o producto`)// no existe carro o prooducto
            res.send(`no existe carro o producto`)
        }    
    } catch (error) {
        res.send(error)
    }
}

export const putSumProductInCart = async (req, res) => {
    try {
        let cid = req.params.cid   
        let pid = req.params.pid
        let {quantity} = req.body
        //const carritoCid = await cartModel.findOne({_id: cid})
        const carritoCid = await findOneIdCartPopulate(cid)
        const indexProductoId = carritoCid.products.findIndex(car => car.id_prod == pid)
        carritoCid.products[indexProductoId].cant = parseInt(quantity)
        //await cartModel.updateOne({_id: cid}, carritoCid)
        await updateCart(cid, carritoCid)
        res.send(carritoCid)     
    } catch (error) {
        res.send(error)
    }
}

export const deleteProductTheCartId = async(req, res)=>{
    try {
        let cid = req.params.cid
        //const carritoCid = await cartModel.findOne({_id: cid})
        const carritoCid = await findOneIdCartPopulate(cid)
        carritoCid.products = []
        //await cartModel.updateOne({_id: cid}, carritoCid)
        await updateCart(cid, carritoCid)
        res.send(carritoCid)   
    } catch (error) {
        res.send(error)
    }
}

export const deleteProductIdInCartId = async(req, res)=>{
    try { 
        let cid = req.params.cid   
        let pid = req.params.pid 
        //const carritoCid = await cartModel.findOne({_id: cid})
        const carritoCid = await findOneIdCartPopulate(cid)
        const indexProductoId = carritoCid.products.findIndex(car => car.id_prod == pid)
        carritoCid.products.splice(indexProductoId,1) 
        //await cartModel.updateOne({_id: cid}, carritoCid)  
        await updateCart(cid, carritoCid)   
        res.send(carritoCid)
    } catch (error) {
        res.send(error)
    }
}

export const purchaseCart = async(req, res) =>{
    try {
        const cid = req.params.cid
        const carritoCid = await findOneIdCartPopulate(cid, {__v: 0})
        const productos = await findProduct({}, {__v: 0})
        let total = 0
        const prodTicket = []
        const prodCarts = []
//los sotck reales al momento de la compra
//Por las dudas actualizo el stock que contiene la base al valor referencia que posee el carrito (por lo que se ve es siempre el mismo valor)
        carritoCid.products.forEach((prodCart) => {
            let id1 = prodCart.id_prod._id.toString()          
            productos.forEach(async(prod)=> {
              let id2 = prod._id.toString()                   
              if (id1 === id2) {
                prodCart.id_prod.stock = prod.stock 
                if(prodCart.cant <= prodCart.id_prod.stock){
                    prodTicket.push(prodCart)
                    let subtotal = prodCart.id_prod.price * prodCart.cant
                    total += subtotal
                    await updateOneProduct({_id: id1}, {stock: prod.stock - prodCart.cant })
                }else{
                    prodCarts.push(prodCart)
                }            
             }   
            })
        })
        carritoCid.products = prodCarts
        const cartSinTicket = await updateCart(cid, carritoCid)
        const newTicket = await createTicket({
            amount: total,
            purchaser: req.user.email,
            products: prodTicket
        })        
        res.status(200).send(newTicket)
    } catch (error) {
        res.send(error)
    }
}