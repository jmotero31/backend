import jwt from "jsonwebtoken"
import config from "../config/config.js"


export const generateToken =  user =>{
    const token = jwt.sign({user}, config.jwt_private_key, {expiresIn: '24h'})
    return token
}

export const authToken = (req, res, next) =>{
    /*
    Si el front envia por header por esta prodiedad el Token
    const authorizationHeader = req.get('Authorization')
    const token = authorizationHeader.split(' ')[1]
    */ 
    let token = req.headers.authorization
    if(!token) token = req.cookies['access_token']
     //const token = req.cookies['access_token']
    if(!token) return res.status(401).json({error: 'Not auth'})
    jwt.verify(token, config.jwt_private_key, (error, Credential)=>{
        if(error) return res.status(403).json({error: ' Not authorized'})
        req.user = Credential.user
        next()
    })
}