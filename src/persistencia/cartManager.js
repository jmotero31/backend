import { cartModel } from '../persistencia/models/cart.model.js'

export default class cartManager{
    async findOneIdPopulate(id){
        try {
            const cart = await cartModel.findOne({_id: id}, {__v: 0}).populate('products.id_prod')          
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
}