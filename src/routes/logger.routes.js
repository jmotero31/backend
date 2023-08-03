import { Router } from "express";
import { loggerTest } from "../controllers/logger.controllers.js";

const loggerRouter = Router()

loggerRouter.get('/', loggerTest)

export default loggerRouter