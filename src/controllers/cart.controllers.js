import { findOneIdCartPopulate, createCart, updateCart } from '../services/cart.services.js'
import { findOneProduct, updateOneProduct, findProduct } from "../services/product.services.js"
import { createTicket } from '../services/ticket.services.js'


export const getCartAll = async (req, res)=>{
    try {      
        const id = req.user.cart
        const carrito = await findOneIdCartPopulate(id, {__v: 0})
        const valor = carrito.products.map((p)=>p.toJSON()) // mapeo xq cuando renderizo en el handlebars      
        if(valor.length){valor[0].idCarrito = id}
        req.cant = valor.length
        //res.status(200).json({message:'Cart', carrito})
        res.render('cart', {car: valor, idcarrito: id, valorNav: true, name:`Hola, ${req.user.first_name}` , rol: req.user.rol=="administrador"? true:false, cantidad: req.cant})       
    } catch (error) {
        res.status(500).json({message: 'Error',error})
    }
}
export const postCreateCart = async(req,res) =>{
    try {
        const carrito = await createCart({})
        //res.send({status:"success", payload: carrito})
        res.status(200).json({message:'Create Cart', carrito})       
    } catch (error) {
        res.status(500).json({message: 'Error',error})
    }
}
export const getCartId = async (req, res)=>{
    try {
        let cid = req.params.cid
        const carritoCid = await findOneIdCartPopulate(cid, {_id: 0, __v: 0})       
        const valor = carritoCid.products.map((p)=>p.toJSON())  // mapeo xq cuando renderizo en el handlebars 
        res.render('cart', {car: valor, valorNav: true, name: `Hola, ${req.user.first_name}`, rol: req.user.rol=="administrador"? true:false})  
        //res.status(200).json({message:'Cart', carritoCid})         
    } catch (error) {
        res.status(500).json({message: 'Error',error})
    }
}
export const postAddProductInCart = async (req, res)=>{
    try {
        let cid = req.params.cid  
        let pid = req.params.pid
        const {quantity} = req.body
        const carritoCid = await findOneIdCartPopulate(cid, {})       
        const productoPid = await findOneProduct({_id: pid}, {})        
        if(productoPid && carritoCid){
            const valor = carritoCid.products.find(car => car.id_prod == pid)
            if(valor){
                if(parseInt(quantity) <= productoPid.stock){
                    // si el producto ya se encuentra en el carrito | actualizo la cantidad
                    const indexProductoId = carritoCid.products.findIndex(car => car.id_prod == pid)
                    carritoCid.products[indexProductoId].cant = carritoCid.products[indexProductoId].cant + parseInt(quantity)
                    const cartUpdate = await updateCart(cid, carritoCid)                    
                    //res.send(carritoCid)
                    res.status(200).json({message:'Product in the Cart Update', cartUpdate}) 
                }else{
                    console.log(`La cantidad es superior al stock`)
                    //res.send(`La cantidad es superior al stock`)
                    res.status(201).json({message:'La cantidad es superior al stock'}) 
                }
            }else{
                //Se agrego un producto que no estaba en el carrito
                if(parseInt(quantity) <= productoPid.stock){
                    carritoCid.products.push({id_prod: pid, cant: parseInt(quantity)})
                    const cartUpdate = await updateCart(cid, carritoCid)
                    //res.send(carritoCid)
                    res.status(200).json({message:'Product in the Cart Update', cartUpdate})
                }else{
                    //No podes ingresar un producto al carrito si la cantidad es superior a el stock declarado
                    console.log(`No hay stock suficiente para ingresar producto al carrito.`)
                    //res.send(`No hay stock suficiente para ingresar producto al carrito.`)
                    res.status(201).json({message:'No hay stock suficiente para ingresar producto al carrito.'}) 
                }
            }
        }else{
            console.log(`No existe carro o producto`)// no existe carro o prooducto
            //res.send(`no existe carro o producto`)
            res.status(201).json({message:'No existe CARRO o PRODUCTO.'})
        }    
    } catch (error) {
        res.status(500).json({message: 'Error',error})
    }
}

export const putSumProductInCart = async (req, res) => {
    try {
        let cid = req.params.cid   
        let pid = req.params.pid
        let {quantity} = req.body
        const carritoCid = await findOneIdCartPopulate(cid, {})
        const indexProductoId = carritoCid.products.findIndex(car => car.id_prod == pid)
        carritoCid.products[indexProductoId].cant = parseInt(quantity)
        const cartUpdate = await updateCart(cid, carritoCid)
        res.status(200).json({message:'Product in the Cart Update', cartUpdate})
        //res.send(cartUpdate)     
    } catch (error) {
        res.status(500).json({message: 'Error',error})
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
        res.status(500).json({message: 'Error',error})
    }
}
export const deleteProductIdInCartId = async(req, res)=>{
    try { 
        let cid = req.params.cid   
        let pid = req.params.pid 
        //const carritoCid = await cartModel.findOne({_id: cid})
        const carritoCid = await findOneIdCartPopulate(cid, {})
        const indexProductoId = carritoCid.products.findIndex(car => car.id_prod == pid)
        carritoCid.products.splice(indexProductoId,1)  
        const cartUpdate = await updateCart(cid, carritoCid)   
        //res.send(carritoCid)
        res.status(200).json({message:'Product in the Cart Update', cartUpdate})
    } catch (error) {
        res.status(500).json({message: 'Error',error})
    }
}
export const purchaseCart = async(req, res) =>{
    try {
        const cid = req.params.cid
        const carritoCid = await findOneIdCartPopulate(cid, {__v: 0})
        const productos = await findProduct({}, {__v: 0})      
        if(!carritoCid.products.length){return res.status(201).send({status: 'error', message:'No existe productos en el carro'})}
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
        const cartSinTicket = await updateCart(cid, carritoCid) // productos que vuelven al carrito porque no se procesaron
        const newTicket = await createTicket({
            amount: total,
            purchaser: req.user.email,
            products: prodTicket
        })        
        res.status(200).json({message: 'Generate Ticket', newTicket})    
        /*
        res.status(201).json({
            ticketMessage: 'Ticket creado exitosamente',
            ticket: newTicket,
            cartSinTicketMessage: 'Productos faltantes',
            cartSinTicketProducts: cartSinTicket
          });
          */
    } catch (error) {
        res.status(500).json({message: 'Error',error})
    }
}