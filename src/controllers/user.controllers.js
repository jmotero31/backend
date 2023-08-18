//import { userModel } from "../models/Users.js"
import { findAllOrderByLastName, updateUse, findByIdUser } from "../services/user.services.js"

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
        res.status(500).json({message: 'error', error})
    }
}
export const getFakerYou = async(req, res) =>{
    try {
        const user = []
        for(let i=0; i<20; i++){
            user.push(generateUser())
        }
        res.status(200).json({status: 'success', payload: user})
    } catch (error) {
        res.status(500).json({message: 'error', error})
    }
}
export const updatePremierUser = async(req, res) =>{
    try {      
        const id = req.params.uid
        const obj = await findByIdUser(id)
        if(obj){
            if(obj.rol == 'usuario'){
                const owner = 'premium'             
                const updateUserPremium = await updateUse(id, obj, owner)
                return res.status(200).json({status: 'success', payload: updateUserPremium})
            } 
            if(obj.rol == 'premium'){
                const owner = 'usuario'             
                const updateUserPremium = await updateUse(id, obj, owner)
                return res.status(200).json({status: 'success', payload: updateUserPremium})
            }
        }else{
            return res.status(401).json({message: 'No existe usuario'})
        }
    } catch (error) {
        res.status(400).json({message: 'error', error})
    }
}
