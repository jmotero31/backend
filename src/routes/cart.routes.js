import { Router } from "express";
import { getCartAll, postCreateCart, getCartId, postAddProductInCart, putSumProductInCart, deleteProductTheCartId, deleteProductIdInCartId, purchaseCarte } from "../controllers/cart.controllers.js";
import { authToken, authUser, authPremiunUser } from '../utils/jsontoken.js'

const cartRoute = Router()

cartRoute.get('/', authToken, authPremiunUser, getCartAll)
cartRoute.post('/', authToken, authUser, postCreateCart)
cartRoute.get('/:cid', authToken, authUser, getCartId)

cartRoute.post('/:cid/product/:pid', authToken, authPremiunUser, postAddProductInCart)
cartRoute.put('/:cid/product/:pid', authToken, authUser, putSumProductInCart) // sabiendo que existe puedo aumentar o decrementar desde el carrito mismo
cartRoute.delete('/:cid/product/:pid', authToken, authPremiunUser, deleteProductIdInCartId)
cartRoute.delete('/:cid', authToken, authPremiunUser, deleteProductTheCartId)
cartRoute.post('/:cid/purchase', authToken, authPremiunUser, purchaseCarte)

export default cartRoute