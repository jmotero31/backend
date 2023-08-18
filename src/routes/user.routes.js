import { Router } from "express";
import { getUserAll, getFakerYou, updatePremierUser  } from "../controllers/user.controllers.js"; //  {, create}
import { authToken, authAdmin } from "../utils/jsontoken.js";

const userRoute = Router()

userRoute.get('/', authToken, authAdmin, getUserAll)
userRoute.get('/faker', getFakerYou)
userRoute.get('/premium/:uid', updatePremierUser)

export default userRoute