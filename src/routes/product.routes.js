import { Router} from "express";
import { getProductAll, getPoductId, postProduct, putProductUpdateId, deleteProductId} from "../controllers/product.controllers.js";
import { authToken, authAdmin } from '../utils/jsontoken.js'
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
productRouter.post('/', postProduct)
//productRouter.post('/', authAdmin, postProduct) temporal
productRouter.put('/:puid', authToken, authAdmin, putProductUpdateId)
productRouter.delete('/:did', authToken, authAdmin, deleteProductId)
productRouter.get('/mockingproducts', getFakerYouProduct)

export default productRouter