import chatManager from "../persistencia/chatManager.js"; 

const chatsManager = new chatManager()

export const insertManyChat = async(obj)=>{
    try {
        const chat = await chatsManager.insertMany(obj)
        return chat
    } catch (error) {
        return error
    }
}