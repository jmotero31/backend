import { findProduct, findPaginateProduct, findOneProduct, insertManyProduct, updateOneProduct, deleteOneProduct } from '../services/product.services.js'
import {findByIdUser} from '../services/user.services.js'
import CustomError from '../services/errors/customError.js'
import EErrors from '../services/errors/enums.js'
import { generateProductErrorInfo } from '../services/errors/info.js'
import { __dirname } from '../path.js'
import { mailDeleteProductPremium } from '../utils/nodemailer.js'

export const getProductAll = async (req, res)=>{
    try {
        // ESTA ES LA CONSULTA ----> http://localhost:4000/product?limit=4&category=Tecnologia&sort=1
        req.logger.debug(`Producto${req.method} en ${req.url}loggerTest - ${new Date().toLocaleTimeString()}`)    
        const {limit=10, page=1, category, status, sort} = req.query      
        const filtro = {}
        const paginacion = {limit: limit, page: page}       
        if (category !== undefined) {filtro.category = category}
        if (status !== undefined) {filtro.status = status}
        if (sort !== undefined) {paginacion.sort = {price: parseInt(sort)}}       
        if(JSON.stringify(req.query) == '{}'){   
            const producto = await findProduct({},{__v: 0})
            const adapProducto = producto.map((p)=>p.toJSON())
            res.render('product',{ pro: adapProducto, valorNav: true, name:`Hola, ${req.user.first_name}` , rol: req.user.rol=="administrador"? true:false, carritoId: req.user.cart})           
        }else{  
            const renderizado = await findPaginateProduct(filtro, paginacion)            
            const adapRenderizado = renderizado.docs.map((p)=>p.toJSON())
            res.render('product', { pro: adapRenderizado, valorNav: true, name:`Hola, ${req.user.first_name}`, rol: req.user.rol=="administrador"? true:false, carritoId: req.user.cart})                
        }       
    } catch (error) {
        res.send(error)
    }
}
export const getPoductId = async (req, res)=>{
    try {
        let pid = req.params.pid   
        const productoId = await findOneProduct({_id: pid}, {_id: 0, __v: 0})
        const adapProductoId = productoId.map((p)=>p.toJSON())    
        if(productoId){
            res.render('product', {producto: adapProductoId, valorNav: true, name:`Hola, ${req.user.first_name}`, rol: req.user.rol=="administrador"? true:false, carritoId: req.user.cart, cantidad: req.cant})
        }else{
            res.send(`No existe producto con ese Identificador = ${pid}`)
        }      
    } catch (error) {
        res.send(error)
    }
}
export const postProduct = async (req, res)=>{
    try {
        const { title, description, price, stock, category, code } = req.body
        if(!title||!description||!price||!stock||!category||!code){
            CustomError.createCustomError({
                name:"Product creation error",
                cause: generateProductErrorInfo({ title, description, price, stock, category, code }),
                message:'Error trying to create Product',
                code: EErrors.INVALID_TYPES_ERROR
            })
        }      
        const thumbnails = []
        if(!req.file){
            const segmentos = req.files[0].destination.split('/') 
            for (const file of req.files) {
                thumbnails.push(`/${segmentos.slice(-2).join('/')}/` + file.filename)
            }
        }else{
            const segmentos = req.file.destination.split('/')  
            thumbnails.push(`/${segmentos.slice(-2).join('/')}/` + file.filename)
        }
        const objNuevo = { title: title, description: description, price: price, stock: stock, category: category, thumbnail: thumbnails, code: code, owner: req.user._id}
        const newProduct = await insertManyProduct(objNuevo)
        res.status(200).redirect('/product')      
    } catch (error) {
        res.send(error)
    }
}
export const putProductUpdateId = async (req, res) => {
    try {
        let puid = req.params.puid
        const objetoUpdat = req.body
        const updateProduct = await updateOneProduct(puid, objetoUpdat)      
        res.send(updateProduct)     
    } catch (error) {
        res.send(error)
    }
}
export const deleteProductId = async(req, res)=>{
    try {
        let pdid = req.params.did
        const producto = await findOneProduct({_id: pdid})
        if(!producto) return res.status(500).json({status: 'error', error: 'no existe producto'})
        const IdUser = producto.owner
        const user = await findByIdUser(IdUser)
        let deleteProduct = {}
        if(user.rol === 'premium'){
            deleteProduct = await deleteOneProduct({_id: pdid})  
            await mailDeleteProductPremium(user.email, user.last_name, user.first_name, deleteProduct.title)
            return res.status(200).json({status: success, payload: deleteProduct})
        }
        deleteProduct = await deleteOneProduct({_id: pdid})
        res.status(200).json({status: success, payload: deleteProduct})
    } catch (error) {
        res.status(500).json({status: 'error', error})
    }
}
export const getFakerYouProduct = async(req, res) =>{
    try {
        const products = []
        for(let i=0; i<20; i++){
            products.push(generateProduct())
        }
        res.status(200).json({status: 'success', payload: products})
    } catch (error) {
        res.send(error)
    }
}