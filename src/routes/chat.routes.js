import { Router } from "express";
import { getChat, postChat } from "../controllers/chat.controllers.js"; 

const chatRoute = Router()

chatRoute.get('/', getChat)
chatRoute.post('/', postChat)

export default chatRoute