import { cartModel } from "../models/Cart.js"
import { productModel } from "../models/Products.js"

export const getCartAll = async (req, res)=>{
    try {
        
        const id = req.user.cart
        console.log(id)
        const carrito = await cartModel.findOne({_id: id}, {__v: 0}).populate('products.id_prod') // objeto
        console.log(carrito)
        const valor = carrito.products.map((p)=>p.toJSON())
        console.log(valor)
        if(valor.length){valor[0].idCarrito = id}
        res.render('cart', {car: valor, idcarrito: id, valorNav: true, name:`Hola, ${req.user.first_name}` , rol: req.user.rol == 'false' ? false:true})       
    } catch (error) {
        res.send(error)
    }
}

export const postCreateCart = async(req,res) =>{
    try {
        const carrito = await cartModel.create({})
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
        const carritoCid = await cartModel.findOne({_id: cid}, {_id: 0, __v: 0}).populate('products.id_prod') // objeto
        const valor = carritoCid.products.map((p)=>p.toJSON()) 
        res.render('cart', {car: valor, valorNav: req.session.login, name: req.session.user.nombre, rol: req.session.user.rol})  
    } catch (error) {
        res.send(error)
    }
}

export const postAddProductInCart = async (req, res)=>{
    try {
        let cid = req.params.cid  
        console.log('hola entre al cart', cid)
        let pid = req.params.pid
        const {quantity} = req.body
        const carritoCid = await cartModel.findOne({_id: cid}) // objeto carrito
        console.log('encontre carrito', carritoCid)
        const productoPid = await productModel.findOne({_id: pid}) // objeto producto
        if(productoPid && carritoCid){
            const valor = carritoCid.products.find(car => car.id_prod == pid)
            if(valor){
                if(parseInt(quantity) <= productoPid.stock){
                    const indexProductoId = carritoCid.products.findIndex(car => car.id_prod == pid)
                    carritoCid.products[indexProductoId].cant = carritoCid.products[indexProductoId].cant + parseInt(quantity)
                    await cartModel.updateOne({_id: cid}, carritoCid)
                    await productModel.updateOne({_id: pid}, {stock: productoPid.stock - parseInt(quantity) })
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
                    await cartModel.updateOne({_id: cid}, carritoCid)
                    await productModel.updateOne({_id: pid}, {stock: productoPid.stock - parseInt(quantity) })
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
        const carritoCid = await cartModel.findOne({_id: cid})
        const indexProductoId = carritoCid.products.findIndex(car => car.id_prod == pid)
        carritoCid.products[indexProductoId].cant = parseInt(quantity)
        await cartModel.updateOne({_id: cid}, carritoCid)
        res.send(carritoCid)     
    } catch (error) {
        res.send(error)
    }
}

export const deleteProductTheCartId = async(req, res)=>{
    try {
        let cid = req.params.cid
        const carritoCid = await cartModel.findOne({_id: cid})
        carritoCid.products = []
        await cartModel.updateOne({_id: cid}, carritoCid)
        res.send(carritoCid)   
    } catch (error) {
        res.send(error)
    }
}

export const deleteProductIdInCartId = async(req, res)=>{
    try { 
        let cid = req.params.cid   
        let pid = req.params.pid    
        const carritoCid = await cartModel.findOne({_id: cid})
        const indexProductoId = carritoCid.products.findIndex(car => car.id_prod == pid)
        carritoCid.products.splice(indexProductoId,1) 
        await cartModel.updateOne({_id: cid}, carritoCid)     
        res.send(carritoCid)
    } catch (error) {
        res.send(error)
    }
}