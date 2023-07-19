import { ticketModel } from "../persistencia/models/ticket.model.js";

export default class ticketManager{
    async findOneIdPopulate(id){
        try {
            const cart = await ticketModel.findOne({_id: id}, {__v: 0}).populate('products.id_prod')          
            return cart
        } catch (error) {
            return error
        }
    }
    async insertMany(obj){
        try {
            const newTicket = await ticketModel.insertMany(obj)
            return newTicket
        } catch (error) {
            return error
        }
    }
    async updateOne(id, obj){
        try {
            const updateTicket = ticketModel.updateOne({_id: id}, obj)
            return updateTicket
        } catch (error) {
            return error
        }
        
    }
}

