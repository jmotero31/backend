//import { userModel } from "../models/Users.js"
import { findAllOrderByLastName, findByIdUser, findEmailUser } from "../services/user.services.js"

export const getUserAll = async (req, res)=>{
    try {     
        const users = await findAllOrderByLastName()
        if(users.length){
            const userMapeado = users.map((p)=>p.toJSON())
            res.render('user',{usu: userMapeado, valorNav: true, name: req.user.nombre, rol: req.user.rol})      
            //res.status(200).json({message: 'Users found', users})
        }else{
            res.status(200).json({message: 'No users'})
        }      
    } catch (error) {
        res.status(500).json({error})
    }
}



// PASARLO AL SERVICIO PARA QUE UTILICE LAS FUNCIONES DE USER


//funciones para otras controladores 
export const buscarUser = async (email) =>{
    try {
        //const usuario = await userModel.findOne({email: email})
        const usuario = await findEmailUser(email)

        return usuario
    } catch (error) {
        res.status(500).json({error})  
    }
}  
export const buscarUserId = async (id) =>{
    try {
          //const user = await userModel.findById(id)
          const user = await findByIdUser(id)

          return user
    } catch (error) {
        res.status(500).json({error})
    }
}    

export const createUser = async (userNew) =>{
    try {
        //return await userModel.create(userNew)    
        return await createUser(userNew)    
        //return `Gracias ${userNew.first_name}, Usuario  Creado`
    } catch (error) {
        res.status(500).json({error})
    }
}



//----------------------------------------------------------------------------------------------------------------------------------
//Opero con PASSPORT
//----------------------------------------------------------------------------------------------------------------------------------

export const createUserPassport = async (userNew) =>{
    try {
        //const user = await userModel.create(userNew)
        const user = await createUser(userNew)

        return user
        //res.send({status: 'succes', message: "Usuario Creado"})
    } catch (error) {
        res.status(500).json({error})
    }
}
