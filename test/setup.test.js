import mongoose from "mongoose";
import { productModel } from '../src/persistencia/models/product.model.js'
import { cartModel } from "../src/persistencia/models/cart.model.js";
import config from '../src/config/config.js'

before(async ()=>{
    await mongoose.connect(config.mongo_url_atlas)
}) 

after(async ()=>{
    mongoose.connection.close()
})

export const deleteProduct =async ()=>{
    await productModel.findOneAndDelete({}, { sort: { _id: -1 } })
}
export const deleteCart =async ()=>{
    await cartModel.findOneAndDelete({}, { sort: { _id: -1 } })
}