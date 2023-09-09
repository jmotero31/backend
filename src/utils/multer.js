import multer from 'multer'
/*
const storage = (destination, preNombre) => {
    return multer.diskStorage({
        destination: (req, file, cb) =>{
            cb(null, destination) 
        },
        filename: (req, file, cb)=>{
            const usuario = req.params.uid ? req.params.uid : req.user._id;
            console.log(preNombre + '_' + `IDuser ${usuario}`+ '_' + Date.now() + '_' +  file.originalname)
            cb(null, preNombre + '_' + `IDuser ${usuario}`+ '_' +  Date.now() + '_' +  file.originalname) //ver porque en producto no anda req.params.uid
        }
    })
}
const upload = (destination, preNombre) =>{
    return multer({
        storage: storage(destination, preNombre),
        limits: {
            fileSize: 1024 * 1024 * 5, // Establece el tamaño máximo en bytes (en este caso, 5 MB)
        }
    })
}
export default upload
*/
/*
const storageProducts = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'src/public/img/products') 
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + '-' +  `${file.originalname}`)
    }
}) // destino de imagenes con multer
*/
/*
const upload = (multer({
    storage: storageProducts,
    limits: {
        fileSize: 1024 * 1024 * 5, // Establece el tamaño máximo en bytes (en este caso, 5 MB)
      },
}))
*/
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        const body = req.body
        const doc = Object.values(body)[0]
        if(doc == 'ProfileImagen'){
            cb(null, 'src/public/img/profiles')
        }else if(doc == 'DocumentIdent' || doc == 'DocumentCompDomi' || doc == 'DocumentCompCuen'){
            cb(null, 'src/public/documents')
        }else if(doc == 'products'){
            cb(null, 'src/public/img/products')
        }else{
            return console.log('No location doc')
        }
    },
    filename: (req, file, cb)=>{
        
        const usuario = req.params.uid ? req.params.uid : req.user._id
        const body = req.body
        const doc = Object.values(body)[0]
        console.log(doc + '_' + `IDuser ${usuario}`+ '_' + Date.now() + '_' +  file.originalname)
        cb(null, doc + '_' + `IDuser ${usuario}`+ '_' +  Date.now() + '_' +  file.originalname)
    }
})

const upload = (multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
      },
}))

export default upload