import { Schema, model } from "mongoose";

const userSchema = new Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true
    },
    gender: {
        type: String,
        require: true
    }
})

export const userModel = model("users", userSchema)