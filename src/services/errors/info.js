export const generateProductErrorInfo = (product)=>{
    return `Hay una propiedad incompleta:
    Titulo:  ${product.title}
    Precio:  ${product.price}
    Categoria:  ${product.category}
    Descripcion:  ${product.description}
    Codigo:  ${product.code}
    Stock:  ${product.stock}
    Imagenes:  ${product.thumbnail}
    `
}
export const generateCartErrorInfo = (product, cart)=>{
    return `Hay una propiedad no existe:
    Carrito:  ${cart}
    Producto:  ${product}
    `
}