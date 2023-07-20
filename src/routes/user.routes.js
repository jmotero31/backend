import { Router } from "express";
import { getUserAll  } from "../controllers/user.controllers.js"; //  {, create}
import { authToken, authAdmin } from "../utils/jsontoken.js";

const userRoute = Router()

userRoute.get('/', authToken, authAdmin, getUserAll)

export default userRoute