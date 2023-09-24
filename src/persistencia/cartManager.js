import { cartModel } from '../persistencia/models/cart.model.js'

export default class cartManager{
    async findOneIdPopulate(id, filtro){
        try {
            const cart = await cartModel.findOne({_id: id}, filtro).populate('products.id_prod')          
            return cart
        } catch (error) {
            return error
        }
    }
    async create(){
        try {
            const newCart = await cartModel.create({})
            return newCart
        } catch (error) {
            return error
        }       
    }
    async updateOne(id, obj){
        try {
            const updateCart = cartModel.updateOne({_id: id}, obj)
            return updateCart
        } catch (error) {
            return error
        }       
    }
    async deleteMany(obj){
        try {
            deleteAllUser = await cartModel.deleteMany(obj)
            return deleteAllUser
        } catch (error) {
            return error
        }
      }
    async deleteOneCart(id){
        try {
            deleteAllUser = await cartModel.deleteOne({_id: id})
            return deleteAllUser
        } catch (error) {
            return error
        }
    }
}