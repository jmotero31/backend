import productManager from "../persistencia/productManager.js"

const productsManager = new productManager()

export const findProduct = async(filter, visual)=>{
    try {
        const products = await productsManager.find(filter, visual)
        return products
    } catch (error) {
        return error
    }
}
export const findOneProduct = async(filter, visual)=>{
    try {
        const product = await productsManager.findOne(filter, visual)
        return product
    } catch (error) {
        return error
    }
}
export const insertManyProduct = async(obj)=>{
    try {
        const newProduct = await productsManager.insertMany(obj)
        return newProduct
    } catch (error) {
        return error
    }
}
export const updateOneProduct = async(id, obj)=>{
    try {
        const updateProduct = await productsManager.updateOne(id, obj)
        return updateProduct
    } catch (error) {
        return error 
    }
}
export const deleteOneProduct = async(query)=>{
    try {
        const delelteProduct = await productsManager.deleteOne(query)
        return delelteProduct
    } catch (error) {
        return error
    }
}
export const findPaginateProduct = async(filter, paginate)=>{
    try {
        const products = await productsManager.findPaginate(filter, paginate)
        return products
    } catch (error) {
        return error 
    }
}