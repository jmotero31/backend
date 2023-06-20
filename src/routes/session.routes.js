import { Router } from "express";
import { getRegister, postRegister, getLogin, postLogin, destroySession, logue, postLogiN } from "../controllers/session.controllers.js";
import passport from "passport";


const sessionRouter = Router()


//Vista Register
sessionRouter.get('/register', getRegister)
//sessionRouter.post('/register', postRegister) ahora pase el control a passport

//Vista Login
sessionRouter.get('/login', getLogin)
//sessionRouter.post('/login', postLogin)  ahora pase el control a passport
sessionRouter.get('/logout', destroySession) 

//Route por params para probar del navegar 
sessionRouter.get('/testLogin/:email',logue);

//----------------------------------------------------------------------------------------------------------------------------------
//Opero con PASSPORT
//----------------------------------------------------------------------------------------------------------------------------------
//Estrategia Register
sessionRouter.post('/register', passport.authenticate('register', {failureRedirect: '/session/failRegister'}), postRegister)
sessionRouter.get('/failRegister', (req, res)=>{
    res.send({error: 'Failded!'})
})
//Estategia Login
sessionRouter.post('/login', passport.authenticate('login',{ failureRedirect: '/session/failLogin'}), postLogiN)  // tuve que hacer un cambio sobre el original de postLogin
sessionRouter.get('/failLogin', (req, res)=>{
    res.send({error: 'Fail Login!'})
})

export default sessionRouter