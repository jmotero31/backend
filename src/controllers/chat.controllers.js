import { messageModel } from "../models/Messages.js"

export const getChat = async (req, res)=>{
    try {
        res.render('chat', { valorNav: true, name: req.user.nombre, rol: req.user.rol})       
    } catch (error) {
        res.send(error)
    }
}

export const postChat = async(req, res)=>{
    try {
        const { email, sms } = req.body;     
        setTimeout(async()  =>{
            await messageModel.insertMany({user: email, message: sms})
            res.redirect('/product')
          }, 1500);              
    } catch (error) {
        res.send(error)
    }
}