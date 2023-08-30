import { Router} from "express";
import { getProductAll, getPoductId, postProduct, putProductUpdateId, deleteProductId} from "../controllers/product.controllers.js";
import { authToken, authAdmin, authPremiunAdmin } from '../utils/jsontoken.js'
import { getFakerYouProduct } from '../controllers/product.controllers.js'

const productRouter = Router()
//Middleware de autenticacion para continuar con el proceso de la ruta CON SESSION
/*
const auth = (req, res, next) =>{ 
    if(req.session.login) return next()
    return res.redirect('session/login')
    //return res.send('Error de autenticacion')
}
*/
productRouter.get('/', authToken, getProductAll)
productRouter.get('/:pid', authToken, getPoductId)
// Para que funcione desde Postman sin ser admin
productRouter.post('/', authToken, authPremiunAdmin, postProduct)
//productRouter.post('/', postProduct) //temporal
productRouter.put('/:puid', authToken, authPremiunAdmin, putProductUpdateId)
productRouter.delete('/:did', authToken, authPremiunAdmin, deleteProductId)
productRouter.get('/mockingproducts', getFakerYouProduct)

export default productRouter