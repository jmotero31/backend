import {generateToken } from '../utils/jsontoken.js'
import {verifypassword} from '../utils/nodemailer.js'
import {findEmailUser, updateUser, updateUserLastConection, findByIdUser} from '../services/user.services.js'
import config from '../config/config.js'
import jwt from "jsonwebtoken"

//----------------------------------------------------------------------------------------------------------------------------------
//Controladores para el Registro con direccionamiento
//----------------------------------------------------------------------------------------------------------------------------------
export const getRegister = (req, res, next)=>{
    res.render('session/register')
}
//----------------------------------------------------------------------------------------------------------------------------------
//Controladores para el Logueo con direccionamiento
//----------------------------------------------------------------------------------------------------------------------------------
export const getLogin = (req, res, next) =>{
    res.render('session/login')
}
export const destroyCookie = async(req, res, next) =>{
    try {
        if(req.cookies['access_token']){
            res.clearCookie('access_token') 
            res.clearCookie('connect.sid') 
            //console.log(req.user)     
            const user = await findByIdUser(req.user._id)
            user.last_connection = new Date().toISOString()
            await updateUserLastConection(user._id, user)
            delete req.user
            return res.redirect('/')         
        }else{
            return res.redirect('/session/login')
        } 
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//------------------------------------------------------------------------------------------------------------------------------
//Operero con PASSPORT ahora le suma JWT
//------------------------------------------------------------------------------------------------------------------------------

export const postLogiN = async(req, res, next)=>{
    try {
        if(!req.user){
            return res.status(401).send({ status: 'error', error: 'Usuario invalido'})
        }
        const access_token = generateToken(req.user, '5h') //luego del resgitro estaria generando el token
        await updateUserLastConection(req.user._id, req.user)
        res.cookie('access_token', access_token).redirect('/product')
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const postRegisteR = async(req, res, next)=>{
    try {
        res.status(200).render('session/login', {messege: 'Usuario creado'})
    } catch (error) {
        res.status(500).json({ message: error.message })  
    }
}

export const failRegister = (req, res)=>{
    res.send({error: 'Fail Register!'})
}
export const failLogin = (req, res)=>{
    res.send({error: 'Fail Login!'})
}
export const verifyPassword = async (req,res)=>{ 
    try {     
        const email = req.body.email
        if(email){
            const user = await findEmailUser(email)
            if (user){
                const access_token = generateToken(user, '1h')
                const linkpassword = `https://nuevosaires.up.railway.app/session/verify/${access_token}`
                await verifypassword(user.email, user.last_name, user.first_name, linkpassword)
                res.redirect('/session/login')
            }else{
                res.status(401).json({message: 'No existe usuario'})
            }
        }else{
            res.status(400).json({message: 'No recibio datos'})
        }        
    } catch (error) {
        return error
    }   
}
export const newPassword = async (req,res)=>{
    try {
        const token = req.params.token
        jwt.verify(token, config.jwt_private_key, (error, Credential)=>{
           if(error) return res.render('session/login')
           req.user = Credential.user
        })
        res.render(`session/pass`, {email: req.user.email, token: token}) 
    } catch (error) {
        return error
    }   
}
export const updatepass = async (req, res) =>{
    try {
        const token = req.params.token
        const password = req.body.password      
        jwt.verify(token, config.jwt_private_key, (error, Credential)=>{
            if(error) return res.status(403).json({error: ' Not authorized'})
            req.user = Credential.user
         })
         const id = req.user._id
         req.user.password = password
         delete req.user._id
         delete req.user.__v
         const up = await updateUser(id, req.user)
         res.redirect('/session/login')     
    } catch (error) {
        return error
    }
}
export const newpass = (req, res, next) =>{
    res.render('session/newpass')
}