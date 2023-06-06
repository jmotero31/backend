import { userModel } from "../models/Users.js"

export const buscarUser = async (email, password) =>{
    try {
        const usuario = await userModel.findOne({email: email, password: password})
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