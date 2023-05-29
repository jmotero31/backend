import { Schema, model} from "mongoose";
import paginate from 'mongoose-paginate-v2'

const cartSchema = new Schema({
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
});

cartSchema.pre('findOne', function(){this.populate('products.id_prod')})
cartSchema.plugin(paginate)

export const cartModel = model("carts", cartSchema);