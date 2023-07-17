import { messageModel } from '../persistencia/models/chat.model.js'

export default class chatManager{
    async insertMany(obj){
        try {
            const chat = messageModel.insertMany(obj)
            return chat
        } catch (error) {
            return error
        }
    }
}