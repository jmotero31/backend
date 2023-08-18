import { Schema, model } from "mongoose";
import paginate from 'mongoose-paginate-v2'

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    thumbmail: [],
    code: {
        type: String,
        unique: true,
        index: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "users",
        default: 'administrador'   
    } 
});

productSchema.plugin(paginate)

export const productModel = model("products", productSchema);