import EErrors from '../services/errors/enums.js'
export default (error, req, res, next)=>{
    //console.log(error.code)
    switch(error.code){
        case EErrors.INVALID_TYPES_ERROR:
            console.log('hola')
            res.status(400).send({status: "error", error: error.name})
            break;
        default:
            res.send({status:'error', error: "Unhandle error"})
            break;
    }
}