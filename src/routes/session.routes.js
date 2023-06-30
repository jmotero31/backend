import { Router } from "express";
import { getRegister, postRegister, getLogin, destroySession, logue, postLogiN, postRegisteR, failRegister, failLogin, destroyCookie } from "../controllers/session.controllers.js";
import passport from "passport";
import { authToken } from "../utils/jsontoken.js";

const sessionRouter = Router()

//Vista Register
sessionRouter.get('/register', getRegister)
//sessionRouter.post('/register', postRegister) ahora pase el control a passport

//Vista Login
sessionRouter.get('/login', getLogin)
//sessionRouter.post('/login', postLogin)  ahora pase el control a passport
sessionRouter.get('/logout', destroyCookie) 

//Route por params para probar del navegar 
sessionRouter.get('/testLogin/:email',logue);

//----------------------------------------------------------------------------------------------------------------------------------
//Opero con PASSPORT Local
//----------------------------------------------------------------------------------------------------------------------------------
//Estrategia Register
sessionRouter.post('/register', passport.authenticate('register', {failureRedirect: '/session/failRegister'}), postRegisteR)
sessionRouter.get('/failRegister', failRegister)
//Estategia Login
sessionRouter.post('/login', passport.authenticate('login',{ failureRedirect: '/session/failLogin'}), postLogiN)  // tuve que hacer un cambio sobre el original de postLogin
sessionRouter.get('/failLogin', failLogin)
sessionRouter.get('/private', authToken, (req, res)=>{
    console.log(req)
    res.json({message: 'ingrese con la autenticacion del token'})
})


//----------------------------------------------------------------------------------------------------------------------------------
//Opero con PASSPORT Github
//----------------------------------------------------------------------------------------------------------------------------------

sessionRouter.get('/github', passport.authenticate('github', {scope: ['user:email']})) // esta ruta registro
sessionRouter.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/session/login'}), postLogiN)

//----------------------------------------------------------------------------------------------------------------------------------
//Opero con PASSPORT Google
//----------------------------------------------------------------------------------------------------------------------------------
sessionRouter.get('/google',passport.authenticate('google', { scope: ['profile'] }));
sessionRouter.get('/googlecallback',passport.authenticate('google', { failureRedirect: '/session/login' }), postLogiN);

export default sessionRouter