import { Schema, model } from "mongoose"
import crypto from "crypto"

const ticketSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        default: () => crypto.randomUUID()
    },
    purchase_datetime: {
        type: Date,
        required: true,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    },
    products: {
        type: [
            {
                "_id": false,
                
                id_prod: {
                    type: Schema.Types.ObjectId,
                    ref: "products"
                }, 
                cant: Number
            }
        ], 
        default: []
    }
})
ticketSchema.pre('find', function(){this.populate('products.id_prod')})

export const ticketModel = model("tickets", ticketSchema)