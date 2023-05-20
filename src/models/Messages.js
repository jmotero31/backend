import { Schema, model} from "mongoose";

const messageSchema = new Schema({
    user: {
        type: String,
        require: true
    },
    message:{
        type: String,
        require: true
    } 

})

export const messageModel = model("messages", messageSchema) // la collection