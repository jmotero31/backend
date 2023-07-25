import { findProduct, findPaginateProduct, findOneProduct, insertManyProduct, updateOneProduct, deleteOneProduct } from '../services/product.services.js'
import EErrors from '../utils/error/errors.enum.js'
import CustomError from '../utils/error/erros.middleware.js'
import generateProductErrorInfo from '../utils/error/generateProductErrorInfo.js'

export const getProductAll = async (req, res)=>{
    try {
        // ESTA ES LA CONSULTA ----> http://localhost:4000/product?limit=4&category=Tecnologia&sort=1
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

            res.render('product',{ pro: adapProducto, valorNav: true, name:`Hola, ${req.user.first_name}` , rol: req.user.rol=="administrador"? true:false, carritoId: req.user.cart})           
        }else{  
            //const renderizado = await productModel.paginate(filtro, paginacion)
            const renderizado = await findPaginateProduct(filtro, paginacion)            
            //ESTE ES EL OBJETO QUE DEVUELVE
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
        const { title, description, price, status, stock, category, thumbnail, code } = req.body
    if(!title||!description||!price||!status||!stock||!category||!thumbnail||!code){
        CustomError.CustomError({
            name:"Product creation",
            causa: generateProductErrorInfo({ title, description, price, status, stock, category, thumbnail, code }),
            message:'Error trying to create Product',
            code: EErrors.INVALID_TYPES_ERROR
        })
    }
        const objNuevo = { title: title, description: description, price: price, status: status, stock: stock, category: category, thumbnail: thumbnail, code: code}
        const objProductoNew = req.body
        setTimeout(async()  =>{

            //await productModel.insertMany(objNuevo)
            const newProduct = await insertManyProduct(objNuevo)

            res.redirect('product')             
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


        res.send(updateProduct)     
    } catch (error) {
        res.send(error)
    }
}

export const deleteProductId = async(req, res)=>{
    try {
        let pdid = req.params.did

        //await productModel.deleteOne({_id: pdid})
        const deleteProduct = await deleteOneProduct(pdid)


        res.send(deleteProduct)   
    } catch (error) {
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
        console.log(error)
    }
}