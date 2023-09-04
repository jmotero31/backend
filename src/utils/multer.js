import multer from 'multer'

const storageProducts = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'src/public/img/products') 
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + '-' +  `${file.originalname}`)
    }
}) // destino de imagenes con multer

const upload = (multer({
    storage: storageProducts,
    limits: {
        fileSize: 1024 * 1024 * 5, // Establece el tamaño máximo en bytes (en este caso, 5 MB)
      },
}))

export default upload