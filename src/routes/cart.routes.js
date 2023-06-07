import { Router } from "express";
import { getCartAll, postCreateCart, getCartId, postAddProductInCart, putSumProductInCart, deleteProductTheCartId, deleteProductIdInCartId } from "../controllers/cart.controllers.js";

const cartRoute = Router()

cartRoute.get('/', getCartAll)
cartRoute.post('/', postCreateCart)
cartRoute.get('/:cid', getCartId)
cartRoute.post('/:cid/product/:pid', postAddProductInCart)
cartRoute.put('/:cid/product/:pid', putSumProductInCart)
cartRoute.delete('/:cid', deleteProductTheCartId)
cartRoute.delete('/:cid/product/:pid', deleteProductIdInCartId)

export default cartRoute