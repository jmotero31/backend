import ticketManager from '../persistencia/ticketManager.js'

const ticketsManager = new ticketManager()

export const createTicket = async(obj)=>{
    try {
        const ticket = await ticketsManager.insertMany(obj)
        return ticket
    } catch (error) {
        return error
    }
}
export const findOneIdTicketPopulate = async(id)=>{
    try {
        const findOneIdPopulate = await ticketsManager.findOneIdPopulate(id)
        return findOneIdPopulate  
    } catch (error) {
        return error
    }
}
export const updateTicket = async(id, obj)=>{
    try {
        const updateTicket = ticketsManager.updateOne(id, obj)
        return updateTicket
    } catch (error) {
        return error
    }
}