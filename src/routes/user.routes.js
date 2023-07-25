import { Router } from "express";
import { getUserAll, getFakerYou  } from "../controllers/user.controllers.js"; //  {, create}
import { authToken, authAdmin } from "../utils/jsontoken.js";

const userRoute = Router()

userRoute.get('/', authToken, authAdmin, getUserAll)
userRoute.get('/faker', getFakerYou)

export default userRoute