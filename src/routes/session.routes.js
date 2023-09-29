import { Router } from "express"
import { getRegister, getLogin, postLogiN, postRegisteR, failRegister, failLogin, destroyCookie, verifyPassword, newPassword, updatepass, newpass } from "../controllers/session.controllers.js"
import passport from "passport"
import { authToken } from "../utils/jsontoken.js"

const sessionRouter = Router()

sessionRouter.get('/register', getRegister)
sessionRouter.get('/login', getLogin)
sessionRouter.get('/logout', authToken, destroyCookie) 
sessionRouter.get('/newpass', newpass)
sessionRouter.post('/verify', verifyPassword)
sessionRouter.get('/verify/:token', newPassword)
sessionRouter.post('/verify/:token', updatepass)

//----------------------------------------------------------------------------------------------------------------------------------
//Opero con PASSPORT Local
//----------------------------------------------------------------------------------------------------------------------------------
sessionRouter.post('/register', passport.authenticate('register', {failureRedirect: '/session/failRegister'}), postRegisteR)
sessionRouter.get('/failRegister', failRegister)
//Estategia Login
sessionRouter.post('/login', passport.authenticate('login',{ failureRedirect: '/session/login'}), postLogiN)  // tuve que hacer un cambio sobre el original de postLogin
sessionRouter.get('/failLogin', failLogin)

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