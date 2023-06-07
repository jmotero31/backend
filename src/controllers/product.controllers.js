import { productModel } from "../models/Products.js";

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
            const producto = await productModel.find({},{__v: 0})
            const adapProducto = producto.map((p)=>p.toJSON())
            res.render('product',{ pro: adapProducto, valorNav: req.session.login, name: req.session.user.nombre, rol: req.session.user.rol})           
        }else{            
            const renderizado = await productModel.paginate(filtro, paginacion) //ESTE ES EL OBJETO QUE DEVUELVE
            const adapRenderizado = renderizado.docs.map((p)=>p.toJSON())
            res.render('product', { pro: adapRenderizado, valorNav: req.session.login, name: req.session.user.nombre, rol: req.session.user.rol})                
        }       
    } catch (error) {
        res.send(error)
    }
}

export const getPoductId = async (req, res)=>{
    try {
        let pid = req.params.pid      
        const productoId = await productModel.findOne({_id: pid}, {_id: 0, __v: 0})
        //console.log(productoId)
        const adapProductoId = productoId.map((p)=>p.toJSON())     
        if(productoId){
            res.render('product', {producto: adapProductoId, valorNav: req.session.login, name: req.session.user.nombre, rol: req.session.user.rol})
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
        const objNuevo = { title: title, description: description, price: price, status: status, stock: stock, category: category, thumbnail: thumbnail, code: code}
        const objProductoNew = req.body
        console.log(objProductoNew)
        console.log(objNuevo)
        setTimeout(async()  =>{
            await productModel.insertMany(objNuevo)
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
        await productModel.updateOne({_id: puid}, objetoUpdat)
        res.send(objetoUpdat)     
    } catch (error) {
        res.send(error)
    }
}

export const deleteProductId = async(req, res)=>{
    try {
        let pdid = req.params.did
        await productModel.deleteOne({_id: pdid})
        res.send(dele)   
    } catch (error) {
        res.send(error)
    }
}