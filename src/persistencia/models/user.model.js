import { Schema, model } from "mongoose";
import paginate from 'mongoose-paginate-v2'

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        unique: true,
        index: true
    },
    gender: {
        type: String,
        required: true,
        default: 'I'
    },
    password: {
        type: String,
        require: true
    },
    cart: {      
            type: Schema.Types.ObjectId,
            ref: "carts"
    },
    rol: {
        type: String,
        enum: ["administrador", "usuario"],
        default: "usuario"
    }
});
userSchema.plugin(paginate)
export const userModel = model("users", userSchema);