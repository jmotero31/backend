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
export const findOneIdCartPopulate = async(id, filtro)=>{
    try {
        const findOneIdPopulate = await cartsManager.findOneIdPopulate(id, filtro)
        return findOneIdPopulate  
    } catch (error) {
        return error
    }
}
export const updateCart = async(id, obj)=>{
    try {
        //console.log('entre', id)
        //console.log('obj', obj)
        const updateCart = cartsManager.updateOne(id, obj)
        return updateCart
    } catch (error) {
        return error
    }
}
export const deleteAllCartsInact = async(cartDelete)=>{
    try {
        const deleteCartUser = await cartsManager.deleteMany(cartDelete)
        return deleteCartUser
    } catch (error) {
        return error
    }
}