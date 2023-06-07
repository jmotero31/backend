import { userModel } from "../models/Users.js"

export const buscarUser = async (email) =>{
    try {
        const usuario = await userModel.findOne({email: email})
        //console.log('aca', usuario)
        return usuario
    } catch (error) {
        console.log(error)   
    }
}  

export const createUser = async (userNew) =>{
    try {
        await userModel.create(userNew)
        return `Gracias ${userNew.first_name}, Usuario  Creado`
    } catch (error) {
        console.log(error)
    }
}

export const getUserAll = async (req, res)=>{
    try {     
        const usuariosTodos = await userModel.find({},{_id: 0, __v: 0}).sort({last_name: 1})
        const adapUsuariosTodos = usuariosTodos.map((p)=>p.toJSON())
        res.render('user',{usu: adapUsuariosTodos, valorNav: req.session.login, name: req.session.user.nombre, rol: req.session.user.rol})      
    } catch (error) {
        res.send(`El dato se encuentra registrado: ${error}`)
    }
}