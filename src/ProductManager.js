import { promises as fs } from 'fs'
//Funciones
const escribirTxt = async (ruta, pro) =>{
    try {
        await fs.writeFile(ruta, JSON.stringify(pro))
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
export class ProductManager{
    constructor(ruta){
       this.producto =[]
       this.ide = 0
       this.path = ruta
    }
    async addProduct(prod){
        if(prod.title && prod.description && prod.price && prod.thumbnail && prod.code  && prod.stock){
           if(!await leerTxt(this.path)){
                await escribirTxt(this.path, this.producto)
                console.log('Se aca de Crear archivo txt para el guardado de sus datos')
           }
           let  verificado = this.producto.find(produc => (prod.code === produc.code) )
           if(!verificado){
               //const leido = await leerTxt(this.path) 
               //this.producto = [...leido]
               this.producto.push(prod)
               this.ide = this.ide + 1 
               prod.id = this.ide
               await escribirTxt(this.path, this.producto)
           }else{
            console.log('Este producto ya se encuentra en el array:   ')
            console.log(prod)
           }
        }else{
            console.log("No fue incluido por faltar valores en campo:  ")
            console.log(prod)
        }
    }
    async getProdcuts(){
        const leido = await leerTxt(this.path)
        //console.log(leido)      
        return leido  
    }
    async getProductById(id){
        const consulta = await leerTxt(this.path)
        let consultaId = consulta.find(prof => prof.id === id)
        if(!consultaId){
            console.log('NOT FOUND')
        }else{
            console.log('Su consulta es ', consultaId)         
        }
    }
    async updateProduct(id, productUpdate){
        const consultaUp = await leerTxt(this.path)
        this.producto = [...consultaUp]
        let indexId = this.producto.findIndex(prof => prof.id === id)
        const productoInUpdate = Object.assign(this.producto[indexId],productUpdate)
        this.producto[indexId] = productoInUpdate
        await escribirTxt(this.path, this.producto)
    }
    async deleteProduct(id){
        const consultaDe = await leerTxt(this.path)
        this.producto = [...consultaDe]
        const resultado = this.producto.filter(prod => prod.id != id);
        this.producto = [...resultado]
        await escribirTxt(this.path, this.producto)
    }
}
class Producto{
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail= thumbnail
        this.code = code
        this.stock = stock
    }
}

const prod1 = new Producto('uno', 'description', 'price', '1', 'pepe', 'hgf')
const prod2 = new Producto('dos', 'description2', 'price2', 'thumbnail2', '2','stock2')
const prod3 = new Producto('ocho', 'description2', 'price2', 'thumbnail2', '3','stock2')
const prod4 = new Producto('tres', 'description2', 'price2', 'thumbnail2', '4','stock2')
const prod5 = new Producto('cuatro', 'description2', 'price2', 'thumbnail2', '5','stock2')
const prod6 = new Producto('cinco', 'description2', 'price2', 'thumbnail2', '6','stock2')
const prod7 = new Producto('seis', 'description2', 'price2', 'thumbnail2', '7','stock2')
const prod8 = new Producto('siete', 'description2', 'price2', 'thumbnail2', '8','stock2')

const admi = new ProductManager('./bd.txt')
await admi.addProduct(prod1)
await admi.addProduct(prod2)
await admi.addProduct(prod3)
await admi.addProduct(prod4)
await admi.addProduct(prod5)
await admi.addProduct(prod6)
await admi.addProduct(prod7)
await admi.addProduct(prod8)
/*
await admi.getProdcuts()
await admi.getProductById(3)
await admi.updateProduct(3, {title: "Actualizado", description: 'Actualizado', price: 'Actualizado', thumbnail: 'Actualizado', code: 'Actualizado', stock: 'Actualizado'})
await admi.deleteProduct(5)
await admi.getProdcuts()
*/