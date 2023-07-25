export const generateProductErrorInfo = (product)=>{
    return `Hay una propiedad incompleta
    * ${product.title}
    *${product.price}
    *${product.category}
    *${product.description}
    *${product.code}
    *${product.stock},
    *${product.status}
    *${product.thumbnail}`
}