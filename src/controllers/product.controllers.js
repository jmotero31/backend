import { findProduct, findPaginateProduct, findOneProduct, insertManyProduct, updateOneProduct, deleteOneProduct } from '../services/product.services.js'
//Importaciones de Manejador de errores
import CustomError from '../services/errors/customError.js'
import EErrors from '../services/errors/enums.js'
import { generateProductErrorInfo } from '../services/errors/info.js'

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
            //const producto = await productModel.find({},{__v: 0})
            const producto = await findProduct({},{__v: 0})
            const adapProducto = producto.map((p)=>p.toJSON())
            //res.status(200).send({status: 'success', payload: adapProducto})
            res.render('product',{ pro: adapProducto, valorNav: true, name:`Hola, ${req.user.first_name}` , rol: req.user.rol=="administrador"? true:false, carritoId: req.user.cart})           
        }else{  
            //const renderizado = await productModel.paginate(filtro, paginacion)
            const renderizado = await findPaginateProduct(filtro, paginacion)            
            //ESTE ES EL OBJETO QUE DEVUELVE
            const adapRenderizado = renderizado.docs.map((p)=>p.toJSON())
            //res.status(200).send({status: 'success', payload: adapRenderizado})
            res.render('product', { pro: adapRenderizado, valorNav: true, name:`Hola, ${req.user.first_name}`, rol: req.user.rol=="administrador"? true:false, carritoId: req.user.cart})                
        }       
    } catch (error) {
        //res.status(500).json({status:"error", error})
        res.send(error)
    }
}
export const getPoductId = async (req, res)=>{
    try {
        let pid = req.params.pid   
        //const productoId = await productModel.findOne({_id: pid}, {_id: 0, __v: 0})
        const productoId = await findOneProduct({_id: pid}, {_id: 0, __v: 0})
        const adapProductoId = productoId.map((p)=>p.toJSON())     
        if(productoId){
            res.render('product', {producto: adapProductoId, valorNav: true, name:`Hola, ${req.user.first_name}`, rol: req.user.rol=="administrador"? true:false, carritoId: req.user.cart})
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
        const objNuevo = { title: title, description: description, price: price, stock: stock, category: category, code: code, owner: req.user._id}
        //const objProductoNew = req.body
        setTimeout(async()  =>{
            //await productModel.insertMany(objNuevo)
            const newProduct = await insertManyProduct(objNuevo)
            console.log(newProduct)
            res.status(200).send({status: 'success', payload: newProduct})
            //res.redirect('product') 

        }, 1000);       
    } catch (error) {
        res.send(error)
    }
}
export const putProductUpdateId = async (req, res) => {
    try {
        let puid = req.params.puid
        const objetoUpdat = req.body
        //await productModel.updateOne({_id: puid}, objetoUpdat)
        const updateProduct = await updateOneProduct(puid, objetoUpdat) 
        // res.status(200).send({status: 'success', payload: updateProduct})      
        res.send(updateProduct)     
    } catch (error) {
        // res.status(500).send({status: 'error',})
        res.send(error)
    }
}
export const deleteProductId = async(req, res)=>{
    try {
        let pdid = req.params.did
        const deleteProduct = {}
        if(req.user.rol === 'premiun') return deleteProduct = await deleteOneProduct({_id: pdid, owner: req.user._id})
        //await productModel.deleteOne({_id: pdid})
        deleteProduct = await deleteOneProduct({_id: pdid})
        //res.status(200).send({status: 'success', payload: deleteProduct})
        res.send(deleteProduct)   
    } catch (error) {
        //res.status(500).send({status: 'error', error})
        res.send(error)
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
        //res.status(500).send({status: 'error', error})
        res.send(error)
    }
}