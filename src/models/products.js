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
    price: {
        type: Number,
        require: true
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    thumbmail: [],
    code: {
        type: String,
        require: true,
        unique: true
    } 
})

export const productModel = model("products", productSchema)