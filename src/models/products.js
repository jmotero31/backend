import { Schema, model } from "mongoose";

const productSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    stock: {
        type: Number,
        require: true
    },
    status: {
        type: Boolean,
        default: true
    },
    code: {
        type: String,
        require: true
    },
    thumbmail: []
   
})

export const productModel = model("products", productSchema)