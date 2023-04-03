class ProductManager{
    constructor(array){
       this.producto =[]
    }
    addProduct(prod){
        if(typeof prod.title != 'undefined' && typeof prod.description != 'undefined' && typeof prod.price != 'undefined' && typeof prod.thumbnail != 'undefined' && typeof prod.code != 'undefined' && typeof prod.stock != 'undefined'){
           //console.log("perfecto")
           //console.log(prod.code)
           let  verificado = this.producto.find(produc => (prod.code === produc.code) )
           if(!verificado){
               this.producto.push(prod)
               prod.id = this.producto.length
           }else{
            console.log('Este producto ya se encuentra en el array ')
            console.log(prod)
           }
           //console.log(!verificado)   
        }else{
            console.log("No fue incluido por faltar valores en campo:  ")
            console.log(prod)
        }
    }
    getProdcuts(){
        console.log(this.producto)
    }
    getProductById(id){
        let consultaId = this.producto.find(prof => prof.id === id)
        if(!consultaId){
            console.log('NOT FOUND')
        }else{
            console.log('Su consulta es ')
            console.log(consultaId)
        }
    }
}
class Producto{
    constructor(title, description, price, thumbnail, code,stock){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail= thumbnail
        this.code = code
        this.stock = stock
    }
}

const prod1 = new Producto('Chau', 'description', 'price', 'stock', 'pepe', 'pipo')
const prod2 = new Producto('hola', 'description2', 'price2', 'thumbnail2', 'pipo','stock2')
const prod3 = new Producto('hola', 'description2', 'price2', 'thumbnail2', 'pipo','stock2')
const admi = new ProductManager()
admi.addProduct(prod1)
admi.addProduct(prod2)
admi.addProduct(prod3)
admi.getProdcuts()
admi.getProductById(2)
admi.getProductById(6)
//console.log(admi.producto)





















/*
//Funicion normal
function sumar1(num1, num2){
     return num1 + num2
}

//Funcion anonima

const sumar2 = function(num1,num2){
    return num1 + num2
}


// Funcion flecha
const sumar3 = (num1,num2) => num1 + num2



console.log(sumar1(5, 10))
console.log(sumar2(5, 10))
console.log(sumar3(5, 10))
*/
