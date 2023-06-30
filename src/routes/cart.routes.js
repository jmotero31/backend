import { Router } from "express";
import { getCartAll, postCreateCart, getCartId, postAddProductInCart, putSumProductInCart, deleteProductTheCartId, deleteProductIdInCartId } from "../controllers/cart.controllers.js";
import { authToken } from '../utils/jsontoken.js'

const cartRoute = Router()

cartRoute.get('/', authToken, getCartAll)
cartRoute.post('/', authToken, postCreateCart)
cartRoute.get('/:cid', authToken, getCartId)
cartRoute.post('/:cid/product/:pid', authToken, postAddProductInCart)
cartRoute.put('/:cid/product/:pid', authToken, putSumProductInCart)
cartRoute.delete('/:cid', authToken, deleteProductTheCartId)
cartRoute.delete('/:cid/product/:pid', authToken, deleteProductIdInCartId)

export default cartRoute