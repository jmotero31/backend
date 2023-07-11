import userManager from "../persistencia/userManager.js"
import { createHash } from "../utils/bcrypt.js"

const usersManager = new userManager()

export const findAll = async()=>{
    try {
        const users = await usersManager.find()
        return users
    } catch (error) {
        return error 
    }
}
export const findEmailUser = async(email)=>{
    try {
        const user = await usersManager.findOne({email: email})
        return user
    } catch (error) {
        return error
    }
}
export const findByIdUser = async(id)=>{
    try {
        const user = await usersManager.findById(id)
        return user  
    } catch (error) {
        return error
    }
}
export const findAllOrderByLastName = async()=>{
    try {
        const users = await usersManager.findAllOrderByLastName()
        const adapUsuariosTodos = users.map((p)=>p.toJSON())
        return adapUsuariosTodos
    } catch (error) {
        return error
    }
}
export const createUser = async(obj)=>{
    try {
        let passwordHash = obj.password
        obj.password = createHash(passwordHash)
        const newUser = await usersManager.create(obj)
        return newUser
    } catch (error) {
        return error
    }
}