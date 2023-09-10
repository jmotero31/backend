import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        //const doc = req.body.filetype
        if(req.body.filetype == 'ProfileImagen'){
            cb(null, 'src/public/img/profiles')
        }else if(req.body.filetype == 'DocumentIdent' || req.body.filetype == 'DocumentCompDomi' || req.body.filetype == 'DocumentCompCuen'){
            cb(null, 'src/public/documents')
        }else if(req.body.filetype == 'products'){
            cb(null, 'src/public/img/products')
        }else{
            return console.log('No location doc')
        }
    },
    filename: (req, file, cb)=>{      
        const usuario = req.params.uid ? req.params.uid : req.user._id
        //const doc = req.body.filetype
        //console.log(req.body.filetype + '_' + `IDuser ${usuario}`+ '_' + Date.now() + '_' +  file.originalname)
        cb(null, req.body.filetype + '_' + `IDuser ${usuario}`+ '_' +  Date.now() + '_' +  file.originalname)
    }
})

const upload = (multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
      },
}))

export default upload


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
