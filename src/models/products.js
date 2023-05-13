import { Schema, model } from "mongoose";

const productsCollection = "products"

const productsSchema = new Schema({
    nombre: String,
    apellido: String,
    email: {
        type: String,
        unique: true  // es unico en la base 
    },
    password: String
})

export const productsModel = model('products', productsSchema)