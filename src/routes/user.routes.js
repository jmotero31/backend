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


//userRoute.post('/:uid/documents', upload('src/public/documents', 'DocumentIdent').single('DocumentIdent'))
//userRoute.post('/:uid/documents', upload('src/public/img/profiles', 'ProfileImagen').single('ProfileImagen'), updateProfile)
//userRoute.post('/:uid/documents', upload('src/public/documents', 'DocumentCompDomi').array('DocumentCompDomi', 5), updateDocument('DocumentCompDomi'))
//userRoute.post('/:uid/documents', upload('src/public/documents', 'DocumentCompCuen').array('DocumentCompCuen', 5), updateDocument('DocumentCompCuen'))

export default userRoute