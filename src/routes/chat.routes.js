import { Router } from "express";
import { messageModel } from "../models/Messages.js"

const chatRoute = Router()

chatRoute.get('/', async (req, res)=>{
    try {
        res.render('chat')       
    } catch (error) {
        res.send(error)
    }
})
chatRoute.post('/', async(req, res)=>{
    try {
        const { email, sms } = req.body;     
        setTimeout(async()  =>{
            await messageModel.insertMany({user: email, message: sms})
            res.redirect('/')
          }, 1500);              
    } catch (error) {
        res.send(error)
    }
})

export default chatRoute