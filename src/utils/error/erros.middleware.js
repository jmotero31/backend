import EErrors from '../error/errors.enum.js'
export default (error, req, res, next)=>{
    console.log(error.cause)
    switch(error.code){
        case EErrors.INVALID_TYPES_ERROR:
            res.send({status: "error", error:error.name})
            break
        default:
            res.send({status:'error', error: "Unhandle error"})
    }
}

/*
export const errorMiddleware = (error, req, res, next) => {
    res.send({
        status:error.name,
        message:error.message,
        cause:error.cause
    })
}*/