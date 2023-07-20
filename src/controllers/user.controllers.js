//import { userModel } from "../models/Users.js"
import { findAllOrderByLastName, findByIdUser, findEmailUser } from "../services/user.services.js"

export const getUserAll = async (req, res)=>{
    try {     
        const users = await findAllOrderByLastName()
        if(users.length){
            //const userMapeado = users.map((p)=>p.toJSON())
            res.render('user',{usu: users, valorNav: true, name: req.user.nombre, rol: req.user.rol=="administrador"? true:false})      
            //res.status(200).json({message: 'Users found', users})
        }else{
            res.status(200).json({message: 'No users'})
        }      
    } catch (error) {
        res.status(500).json({error})
    }
}