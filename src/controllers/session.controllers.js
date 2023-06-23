import { buscarUser, createUser } from "../controllers/user.controllers.js";
import { createHash, validatePassword} from "../utils/bcrypt.js";

//----------------------------------------------------------------------------------------------------------------------------------
//Controladores para el Registro con direccionamiento
//----------------------------------------------------------------------------------------------------------------------------------
export const getRegister = (req, res, next)=>{
    res.render('session/register')
}
export const postRegister = async(req, res, next)=>{
    const userNew = req.body
    let pass = userNew.password
    userNew.password = createHash(pass)
    try {
        const user = await createUser(userNew)
        console.log(user)
        res.render('session/login')
    } catch (error) {
        console.log(error)   
    }
}

//----------------------------------------------------------------------------------------------------------------------------------
//Controladores para el Logueo con direccionamiento
//----------------------------------------------------------------------------------------------------------------------------------

export const getLogin = (req, res, next) =>{
    res.render('session/login')
}
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
        console.log(error)
    }
}

//----------------------------------------------------------------------------------------------------------------------------------
//Esta middleware es por params
//----------------------------------------------------------------------------------------------------------------------------------
export const logue = async (req, res) => {
    try {
        const usuario = await buscarUser(req.params.email)
        if(usuario){
            req.session.login = true
            res.send('login activo')
        }
    } catch (error) {
        console.log(error)
    }
}

//------------------------------------------------------------------------------------------------------------------------------
//Operero con PASSPORT
//------------------------------------------------------------------------------------------------------------------------------

export const postLogiN = (req, res, next)=>{
    try {
        if(!req.user){
            return res.status(401).send({ status: 'error', error: 'Usuario invalido'})
        }
        //Genero la session si enviaron datos
        console.log(req.session)
        req.session.login = true
        req.session.user = {nombre: 'Hola, ' + req.user.first_name, rol: req.user.rol=="administrador"? true:false}
        console.log(req.session)
        //res.status(200).send({status: 'success', payload: req.user})
        res.redirect('/product')
    } catch (error) {
        console.log(error)
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