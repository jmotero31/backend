import { Router } from "express";
import { loggerTest } from "../controllers/logger.controllers.js";

const loggerRouter = Router()

loggerRouter.get('/loggerTest', loggerTest)

export default loggerRouter