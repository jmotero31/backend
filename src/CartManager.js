import { promises as fs } from 'fs'

//Funciones para leer y escribir con las conversiones JSON
const escribirTxt = async (ruta, carrito) =>{
    try {
        await fs.writeFile(ruta, JSON.stringify(carrito))
    } catch (error) {
        return error
    }
}
const leerTxt = async (ruta) =>{
    try {
        const infoTxt = await fs.readFile(ruta, 'utf-8')
        const infoArray = JSON.parse(infoTxt)
        return infoArray
    } catch (error) {
        return console.log(error)
    }
}
export class cartManager{
    constructor(ruta){
        this.ide = 0
        this.path = ruta
        this.cart = []
        escribirTxt(this.path, this.cart)
    }
    async createCart(){   
           if(!await leerTxt(this.path)){
                await escribirTxt(this.path, this.cart)
                console.log('Se acaba de Crear archivo TXT con Arrays vacio')
           }    
           this.cart = await leerTxt(this.path)
           this.ide = this.ide + 1 
           /*const id = this.ide
           let generoCarro = {
                id: this.ide,
                producto: []
           }
           */
           this.cart.push({id: this.ide, producto: []})
           await escribirTxt(this.path, this.cart)
           //console.log(this.cart[1].id)
           return `Se agrego el carrito ${this.ide} al Carro General`      
    }
    async getCartById(cid){
        const carrosTodos = await leerTxt(this.path)
        //console.log(consulta)
        let carritoSelec = carrosTodos.find(car => car.id === cid)
        //console.log(consultaId)
        if(carritoSelec){
            if(carritoSelec.producto.length){
                return `Los productos alojados del carrito ${cid} contiene estos producto: ${JSON.stringify(carritoSelec.producto)}`              
            }else{
                return `No existe productos en este carrito ${cid}`
            }
        }else{           
            return `No se encuentra carro con ese CID: ${cid}`
        }
    }
    async addCartProduct(cid, pid, quantityNew){
        const carrosTodos = await leerTxt(this.path)
        if(carrosTodos.some(carrito => carrito.id === cid)){
            const carritoSelec = carrosTodos.find(carrito => carrito.id === cid)
            const indexCarritoId = carrosTodos.findIndex(carrit => carrit.id === cid) 
            //Averiguo que producto es para mencionar el nombre del producto
            const consultaProducto = await leerTxt('./productos.txt')    // Tendria que ver de donde sacar la ruta para que se dinamico
            const producto = consultaProducto.find(carrito => carrito.id === pid)
            if(carritoSelec.producto.some(produ => produ.idProducto === pid)){
                const indexProductoId = carritoSelec.producto.findIndex(producto => producto.idProducto === pid)
                let quantity = carrosTodos[indexCarritoId].producto[indexProductoId].quantity + quantityNew
                if(producto.stock >= quantity){
                    carrosTodos[indexCarritoId].producto[indexProductoId].quantity = quantity
                    this.cart = carrosTodos
                    await escribirTxt(this.path, this.cart)
                    return `Se actualizo la cantidad a ${quantity} de producto: ${producto.title}`
                }else{
                    return `No hay Stock suficiente de producto: ${producto.title}`
                }
            }else{ 
                carrosTodos[indexCarritoId].producto.push({idProducto: pid, quantity: quantityNew})
                this.cart = carrosTodos
                await escribirTxt(this.path, this.cart)
                return `Se agrego al carrito un nuevo producto: ${producto.title}`
            }
        }else{
            return 'No existe carrito'
        }
    }
}
