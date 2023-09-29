import { Router } from "express"
import { getUserAll, getFakerYou, updatePremierUser, updateProfile, deleteUserInactiv, deleteUser } from "../controllers/user.controllers.js" //  {, create}
import { authToken, authAdmin } from "../utils/jsontoken.js"
import upload from "../utils/multer.js"

const userRoute = Router()

userRoute.get('/', authToken, getUserAll)
userRoute.delete('/delete', authToken, authAdmin, deleteUserInactiv)
userRoute.get('/premium/:uid', updatePremierUser)
userRoute.get('/delete/:uid', deleteUser)
userRoute.post('/:uid/documents', upload.single('file'), updateProfile)
userRoute.get('/faker', getFakerYou)

export default userRoute