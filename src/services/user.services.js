//import passport from "passport"
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
        const users = await usersManager.findAllOrderByLastName({},{_id: 0, first_name: 1, last_name: 1 , email: 1, rol: 1})
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
export const updateUser = async(id, obj)=>{
    try {
        let passwordHash = obj.password
        obj.password = createHash(passwordHash)
        const updateUser = await usersManager.updateOne(id, obj)
        return updateUser
    } catch (error) {
        return error
    }
}
export const updateUse = async(id, obj, owner)=>{
    try {
        obj.rol = owner
        const updateUser = await usersManager.updateOne(id, obj)
        return updateUser
    } catch (error) {
        return error
    }
}
export const updateUserLastConection = async(id, obj)=>{
    try {
        const last_connection = new Date().toISOString()
        obj.last_connection = last_connection
        const updateUser = await usersManager.updateOne(id, obj)
        return updateUser
    } catch (error) {
        return error
    }
}
export const updateOneUser = async(id, obj)=>{
    try {
        const updateUser = await usersManager.updateOne(id, obj)
        return updateUser
    } catch (error) {
        return error
    }
}
export const deleteAllUsersInact = async(userDelete)=>{
    try {
        const deleteUser = await usersManager.deleteMany(userDelete)
        return deleteUser
    } catch (error) {
        return error
    }
}