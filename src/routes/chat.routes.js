import { Router } from "express";
import { getChat, postChat } from "../controllers/chat.controllers.js";
import { authToken } from "../utils/jsontoken.js"; 

const chatRoute = Router()

chatRoute.get('/', authToken, getChat)
chatRoute.post('/', authToken, postChat)

export default chatRoute