import { userModel } from "../models/Users.js"

export const buscarUser = async (email) =>{
    try {
        const usuario = await userModel.findOne({email: email})
        return usuario
    } catch (error) {
        console.log(error)   
    }
}  
export const buscarUserId = async (id) =>{
    try {
          const user = await userModel.findById(id)
          return user
    } catch (error) {
       console.log(error) 
    }
}    

export const createUser = async (userNew) =>{
    try {
        return await userModel.create(userNew)        
        //return `Gracias ${userNew.first_name}, Usuario  Creado`
    } catch (error) {
        console.log(error)
    }
}

export const getUserAll = async (req, res)=>{
    try {     
        const usuariosTodos = await userModel.find({},{_id: 0, __v: 0}).sort({last_name: 1})
        const adapUsuariosTodos = usuariosTodos.map((p)=>p.toJSON())
        res.render('user',{usu: adapUsuariosTodos, valorNav: true, name: req.user.nombre, rol: req.user.rol})      
    } catch (error) {
        res.send(`El dato se encuentra registrado: ${error}`)
    }
}



//----------------------------------------------------------------------------------------------------------------------------------
//Opero con PASSPORT
//----------------------------------------------------------------------------------------------------------------------------------

export const createUserPassport = async (userNew) =>{
    try {
        const user = await userModel.create(userNew)
        return user
        //res.send({status: 'succes', message: "Usuario Creado"})
    } catch (error) {
        console.log(error)
    }
}
