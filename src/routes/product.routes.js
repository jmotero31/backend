import { Router} from "express";
import { getProductAll, getPoductId, postProduct, putProductUpdateId, deleteProductId} from "../controllers/product.controllers.js";
import { authToken, authAdmin, authPremiunAdmin } from '../utils/jsontoken.js'
import { getFakerYouProduct } from '../controllers/product.controllers.js'
import upload from "../utils/multer.js";

const productRouter = Router()

productRouter.get('/', authToken, getProductAll)
productRouter.get('/:pid', authToken, getPoductId)
productRouter.post('/', authToken, authPremiunAdmin, upload.array('file', 5), postProduct)
productRouter.put('/:puid', authToken, authPremiunAdmin, putProductUpdateId)
productRouter.delete('/:did', authToken, authPremiunAdmin, deleteProductId)
productRouter.get('/mockingproducts', getFakerYouProduct)

export default productRouter