import { Router } from "express";
import { getCartAll, postCreateCart, getCartId, postAddProductInCart, putSumProductInCart, deleteProductTheCartId, deleteProductIdInCartId, purchaseCart } from "../controllers/cart.controllers.js";
import { authToken, authUser, authPremiunUser } from '../utils/jsontoken.js'

const cartRoute = Router()

cartRoute.get('/', authToken, authUser, getCartAll)
cartRoute.post('/', authToken, authUser, postCreateCart)
cartRoute.get('/:cid', authToken, authUser, getCartId)

cartRoute.post('/:cid/product/:pid', authToken, authPremiunUser, postAddProductInCart)
cartRoute.put('/:cid/product/:pid', authToken, authUser, putSumProductInCart) // sabiendo que existe puedo aumentar o decrementar desde el carrito mismo
cartRoute.delete('/:cid/product/:pid', authToken, authUser, deleteProductIdInCartId)
cartRoute.delete('/:cid', authToken, authUser, deleteProductTheCartId)
cartRoute.post('/:cid/purchase', authToken, authUser, purchaseCart)

export default cartRoute