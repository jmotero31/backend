export const loggerTest = async (req, res)=>{
    req.logger.debug(`${req.method} en ${req.url}loggerTest - ${new Date().toLocaleTimeString()}`)  
    req.logger.http(`${req.method} en ${req.url}loggerTest - ${new Date().toLocaleTimeString()}`)
    req.logger.info(`${req.method} en ${req.url}loggerTest - ${new Date().toLocaleTimeString()}`)
    req.logger.warning(`${req.method} en ${req.url}loggerTest - ${new Date().toLocaleTimeString()}`)
    req.logger.error(`${req.method} en ${req.url}loggerTest - ${new Date().toLocaleTimeString()}`)
    req.logger.fatal(`${req.method} en ${req.url}loggerTest - ${new Date().toLocaleTimeString()}`)
    res.send({message: 'success'})
    
}