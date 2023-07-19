import { Router } from "express";
import { getChat, postChat } from "../controllers/chat.controllers.js";
import { authToken, authUser } from "../utils/jsontoken.js"; 

const chatRoute = Router()

chatRoute.get('/', authToken, authUser, getChat)
chatRoute.post('/', authToken, authUser, postChat)

export default chatRoute