import { Router } from "express";
import { ProductManager } from "../ProductManager.js";

const realtimeproducts = Router()
const produ = new ProductManager('./productos.txt')

realtimeproducts.get('/', async (req, res)=>{
    try {
        //console.log(ide)
        const producto = await produ.getProdcuts()
        
        let ide = producto[producto.length-1].id
        req.io.on('connection', (socket)=>{
            console.log("Cliente conectado", socket.id) 
            socket.emit('server:lista', producto)
            /*
            socket.emit('ping')           
            socket.on('pong', ()=>{
                console.log('pong')
            })
            */
            socket.on('cliente:nuevoproducto', async (info) =>{            
                info.status = true
                info.thumbnail = "vacio"
                //console.log(ide)
                ide = ide
                //console.log(info)
                await produ.addProductSocket(info, ide)
                //console.log(productoagregar)
                const productoagregar = await produ.getProdcuts()
                socket.emit('server:agrego', productoagregar)
               
            })
        })
        const produc = await produ.getProdcuts()
        res.render('realtimeproducts',{producto: produc})  
    } catch (error) {
        res.send(error)
    }
})
export default realtimeproducts