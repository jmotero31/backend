import cartManager from "../persistencia/cartManager.js";

const cartsManager = new cartManager()

export const createCart = async()=>{
    try {
        const cart = await cartsManager.create()
        return cart
    } catch (error) {
        return error
    }
}
export const findOneIdCartPopulate = async(id)=>{
    try {
        const findOneIdPopulate = await cartsManager.findOneIdPopulate(id)
        return findOneIdPopulate  
    } catch (error) {
        return error
    }
}
export const updateCart = async(id, obj)=>{
    try {
        const updateCart = cartsManager.updateOne(id, obj)
        return updateCart
    } catch (error) {
        return error
    }
}