import jwt from "jsonwebtoken"
import config from "../config/config.js"

export const generateToken =  (user, hora) =>{
    const token = jwt.sign({user}, config.jwt_private_key, {expiresIn: hora}) // '5h'
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
    if(!token) return res.redirect('/session/login')//return res.status(401).json({error: 'Not auth'})
    jwt.verify(token, config.jwt_private_key, (error, Credential)=>{
        if(error) return res.status(403).json({error: ' Not authorized'})
        req.user = Credential.user
        next()
    })
}
export const authUser = (req, res, next) =>{
    //if(!req.user) return res.status(401).json({message: 'Usuario no logueado'})
    if(req.user.rol !== 'usuario') return res.status(403).json({message: 'No autorizado'})
    next()
}
export const authAdmin = (req, res, next) =>{
    //if(!req.user) return res.status(401).json({message: 'Usuario no logueado'})
    if(req.user.rol !== 'administrador') return res.status(403).json({message: 'No autorizado'})
    next()
}
export const authPremiunAdmin = (req, res, next) =>{
    //if(!req.user) return res.status(401).json({message: 'Usuario no logueado'})
    if(req.user.rol !== 'administrador' && req.user.rol !== 'premium') return res.status(403).json({message: 'No autorizado'})
    next()
}
export const authPremiunUser = (req, res, next) =>{
    //if(!req.user) return res.status(401).json({message: 'Usuario no logueado'})
    if(req.user.rol !== 'usuario' && req.user.rol !== 'premium') return res.status(403).json({message: 'No autorizado'})
    next()
}