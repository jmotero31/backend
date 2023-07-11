import { productModel } from '../persistencia/models/product.model.js'

export default class productManager{

    async find(filter, visual){
        try {
            const products = await productModel.find(filter, visual)
            return products
        } catch (error) {
            return error
        }
    }
    async findOne(filter, visual){
        try {
            const product = await productModel.findOne(filter, visual)
            return product
        } catch (error) {
            return error
        }
    }
    async insertMany(obj){
        try {
            const newProduct = await productModel.insertMany(obj)
            return newProduct
        } catch (error) {
            return error
        }
    }
    async updateOne(id, obj){
        try {
            const updateProduct = await productModel.updateOne({_id: id}, obj)
            return updateProduct
        } catch (error) {
            return error
        }
    }
    async deleteOne(id){
        try {
            const deleteProduct = await productModel.deleteOne({_id: id})
            return deleteProduct
        } catch (error) {
            return error
        }
    }
    async findPaginate(filter, paginate){
        try {
            const productPaginate = await productModel.paginate(filter, paginate) // filter, paginate son objetos 
            return productPaginate
        } catch (error) {
            return error
        }
    }
}