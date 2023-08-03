import logger from "../utils/logger.js"

export const loggerTest = async (req, res)=>{
    console.log('hola')
    logger.debug("hola")
    res.send({message: 'success'})
    
}