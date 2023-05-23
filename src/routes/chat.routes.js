import { Router } from "express";
import { messageModel } from "../models/Messages.js"

const chatRoute = Router()

chatRoute.get('/', async (req, res)=>{
    try {
        res.render('chat', {dondeEstas: `usted esta aqui`})       
    } catch (error) {
        res.send(error)
    }
})

export default chatRoute