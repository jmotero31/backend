import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
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