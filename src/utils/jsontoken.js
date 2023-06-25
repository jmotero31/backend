import jwt from "jsonwebtoken"


export const generateToken =  user =>{
    const token = jwt.sign({user}, process.env.PRIVATE_KEY, {expiresIn: '24h'})
    return token
}

export const authToken = (req, res, next) =>{
    const token = req.headers.auth
    if(!token) return res.status(401).json({error: 'Not auth'})
    jwt.verify(token, process.env.PRIVATE_KEY, (error, Credential)=>{
        if(error) return res.status(403).json({error: ' Not authorized'})
        req.user = Credential.user
        next()
    })
}