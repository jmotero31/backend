 import { buscarUser, createUser } from "../controllers/user.controllers.js";
import { validatePassword} from "../utils/bcrypt.js";
import {generateToken } from '../utils/jsontoken.js'

//----------------------------------------------------------------------------------------------------------------------------------
//Controladores para el Registro con direccionamiento
//----------------------------------------------------------------------------------------------------------------------------------
export const getRegister = (req, res, next)=>{
    res.render('session/register')
}
/*
export const postRegister = async(req, res, next)=>{
    const userNew = req.body            //lo estoy pasando al user.service
    let pass = userNew.password         //lo estoy pasando al user.service
    userNew.password = createHash(pass) //lo estoy pasando al user.service
    try {
        const user = await createUser(userNew) //lo estoy pasando al user.service
        res.render('session/login')
    } catch (error) {
        console.log(error)   
    }
}
*/
//----------------------------------------------------------------------------------------------------------------------------------
//Controladores para el Logueo con direccionamiento
//----------------------------------------------------------------------------------------------------------------------------------

export const getLogin = (req, res, next) =>{
    res.render('session/login')
}
/*
export const postLogin = async(req, res, next) =>{
    const {email, password} = req.body
    try {

        const usuario = await buscarUser(email)
        if(usuario){
            if(validatePassword(password, usuario.password)){
                req.session.login = true
                req.session.user = {nombre: 'Hola, ' + usuario.first_name, rol: usuario.rol=="administrador"? true:false}
                //res.status(200).json({message: 'Usuario logueado'})
                res.redirect('/product')
            }else{
                return res.status(401).render('session/login', {error: 'Contrasena Equivocada'})
            }
        }else{
            return res.status(401).render('session/resgister', {error: 'Usuario No existe'})
            //res.status(401).json({message: 'Usuario NO logueado'})
            //res.render('session/login', {valor: res.status(401).json({message: 'Usuario NO logueado'})})
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
*/
/*
export const destroySession = (req, res, next) =>{
    try {
        if(req.session.login){
            req.session.destroy(()=>{
                //res.status(200).json({message: 'Session destruida'})
                return res.redirect('/session/login')
            })
        }else{
            return res.redirect('/session/login')
        } 
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
*/
export const destroyCookie = (req, res, next) =>{
    try {
        if(req.cookies['access_token']){
            res.clearCookie('access_token')
            delete req.user
            return res.redirect('/')         
        }else{
            return res.redirect('/session/login')
        } 
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//----------------------------------------------------------------------------------------------------------------------------------
//Esta middleware es por params
//----------------------------------------------------------------------------------------------------------------------------------
/*
export const logue = async (req, res) => {
    try {
        const usuario = await buscarUser(req.params.email)
        if(usuario){
            req.session.login = true
            res.send('login activo')
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
*/
//------------------------------------------------------------------------------------------------------------------------------
//Operero con PASSPORT ahora le suma JWT
//------------------------------------------------------------------------------------------------------------------------------

export const postLogiN = (req, res, next)=>{
    try {
        if(!req.user){
            return res.status(401).send({ status: 'error', error: 'Usuario invalido'})
        }
        /*
        //Genero la session si enviaron datos          
        req.session.login = true
        req.session.user = {nombre: 'Hola, ' + req.user.first_name, rol: req.user.rol=="administrador"? true:false}
        //res.status(200).send({status: 'success', payload: req.user})
        */
        req.user.rol = req.user.rol=="administrador"? true:false
        //console.log(req.user)
        const access_token = generateToken(req.user) //luego del resgitro estaria generando el token
        //console.log('Token Login: ', access_token)
        res.cookie('access_token', access_token).redirect('/product')

        //res.redirect('/product').json({status: 'success', access_token})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const postRegisteR = async(req, res, next)=>{
    try {
        res.status(200).render('session/login', {messege: 'Usuario creado'})
        //res.status(200).send({status: 'success', payload: req.user})
        
        //const access_token = generateToken(req.userCreated) // luego del logue genero el token
        //console.log('Token Register: ', access_token)
        //res.cookie('access_token', access_token).redirect('/product')
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


/*
export const getSession = (req, res, next) =>{
    try {
        if(req.session.login){
            res.status(200).json({message: 'Session activa'})
        }else{
            //res.status(401).json({message: 'Session no activa'})
            res.render('sessions')
        }    
    } catch (error) {
        console.log(error)
    }
}
*/