//import { messageModel } from "../models/Messages.js"
import { insertManyChat } from "../services/chat.services.js"

export const getChat = async (req, res)=>{
    try {
        console.log(req.user.first_name)
        console.log(req.user.rol)
        res.render('chat', {valorNav: true, name: `Hola, ${req.user.first_name}`, rol: req.user.rol=="administrador"? true:false})       
    } catch (error) {
        res.send(error)
    }
}

export const postChat = async(req, res)=>{
    try {
        const { email, sms } = req.body;     
        setTimeout(async()  =>{
            //await messageModel.insertMany({user: email, message: sms})
            await insertManyChat({user: email, message: sms})
            res.redirect('/product')
          }, 1500);              
    } catch (error) {
        res.send(error)
    }
}