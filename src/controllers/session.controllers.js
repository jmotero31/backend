import { buscarUser, createUser } from "../controllers/user.controllers.js";

//Controladores para el Registro con direccionamiento
export const getRegister = (req, res, next)=>{
    console.log('aca')
    res.render('session/register')
}
export const postRegister = async(req, res, next)=>{
    const userNew = req.body
    try {
        const user = await createUser(userNew)
        console.log(user)
        res.render('session/login')
    } catch (error) {
        console.log(error)   
    }
}

//Controladores para el Logueo con direccionamiento
export const getLogin = (req, res, next) =>{
    console.log('a')
    res.render('session/login')
}
export const postLogin = async(req, res, next) =>{
    const {email, password} = req.body
    try {
        const usuario = await buscarUser(email, password)
        if(usuario){
            req.session.login = true
            //res.status(200).json({message: 'Usuario logueado'})
            res.redirect('/product')
        }else{
            // return res.status(401).render('/errors/base', {error: 'Error en email y/o password})
            res.status(401).json({message: 'Usuario NO logueado'})
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const destroySession = (req, res, next) =>{
    if(req.session.login){
        req.session.destroy(()=>{
            res.status(200).json({message: 'Session destruida'})
        })
    }else{
        res.redirect('/session/login')
    }
}

//Esta middleware es por params
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