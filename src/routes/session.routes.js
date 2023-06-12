import { Router } from "express";
import { getRegister, postRegister, getLogin, postLogin, destroySession, logue, getLogiN } from "../controllers/session.controllers.js";
//import passport from "passport";


const sessionRouter = Router()


//Vista Register
sessionRouter.get('/register', getRegister)
sessionRouter.post('/register', postRegister)

//Vista Login
sessionRouter.get('/login', getLogin)
sessionRouter.post('/login', postLogin)
sessionRouter.get('/logout', destroySession) 

//Route por params para probar del navegar 
sessionRouter.get('/testLogin/:email',logue);

//----------------------------------------------------------------------------------------------------------------------------------
//Opero con PASSPORT
//----------------------------------------------------------------------------------------------------------------------------------
//sessionRouter.get('/login',passport.authenticate('login'), getLogiN)


export default sessionRouter