import { Router } from "express";
import { getRaiz } from "../controllers/raiz.controllers.js";


const raizRouter = Router()

raizRouter.get('/', getRaiz)

export default raizRouter