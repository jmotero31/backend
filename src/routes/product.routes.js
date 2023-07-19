import { Router} from "express";
import { getProductAll, getPoductId, postProduct, putProductUpdateId, deleteProductId} from "../controllers/product.controllers.js";
import { authToken, authAdmin } from '../utils/jsontoken.js'

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
productRouter.post('/', authAdmin, postProduct)
productRouter.put('/:puid', authToken, authAdmin, putProductUpdateId)
productRouter.delete('/:did', authToken, authAdmin, deleteProductId)

export default productRouter
/*
await productModel.create([
    {title:'Set Juego De Llaves Tubos', description: 'Set Juego De Llaves Tubos Y Puntas Combinadas 108 Pza Valija', price: 23000, status: 'true', stock: 20, category: 'Herramientas', thumbmail: 'thumbnail1', code: 'code1'},
    {title:'Caja De Herramientas Makita 24', description: 'Esta caja Makita CH24 te brindará el espacio, la comodidad y practicidad', price: 15900, status: 'true', stock: 20, category: 'Herramientas', thumbmail: 'thumbnail2', code: 'code2'},
    {title:'Celular Motorola Moto E13 64gb', description: 'El nuevo Moto E13 que tiene un diseño fino, ligero y llamativo', price: 48899, status: 'true', stock: 20, category: 'Tecnologia', thumbmail: 'thumbnail3', code: 'code3'},
    {title:'Canon EOS Rebel Kit T100', description: 'Canon combina calidad y rendimiento en sus productos', price: 246999, status: 'true', stock: 20, category: 'Tecnologia', thumbmail: 'thumbnail4', code: 'code4'},
    {title:'Zapatillas Jaguar Oficial', description: 'DEPORTIVA LIVIANA DE PVC MONOCOLOR, RESISTENTE', price: 5825, status: 'true', stock: 20, category: 'Deportes', thumbmail: 'thumbnail5', code: 'code5'},
    {title:'Nemeziz Messi 19.4 Fxg J Azul adidas', description: 'Nemeziz Messi 19.4 Fxg J es un nuevo producto para Niños de adidas', price: 20599, status: 'true', stock: 20, category: 'Deportes', thumbmail: 'thumbnail6', code: 'code6'},
    {title:'Secador de pelo BaBylissPRO Academy B6172 negro 220V', description: 'Si hay algo que no puede faltar en tu baño es un secador de pelo BaBylissPRO Academy', price: 30990, status: 'true', stock: 20, category: 'Belleza', thumbmail: 'thumbnail7', code: 'code7'},
    {title:'Planchita de pelo BaBylissPRO Nano Titanium Iónica Digital BABNT2091T azul 220V', description: 'Conseguí un lacio perfecto con la planchita BaBylissPRO Iónica Digital. Con su tecnología y calidad vas a lucir tus looks siempre impecables', price: 45990, status: 'true', stock: 20, category: 'Belleza', thumbmail: 'thumbnail8', code: 'code8'}
])
*/