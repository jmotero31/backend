import { Router } from "express";
import sessionRouter from "./session.routes";

//Generar informacion en cookies
const cookieRouter = Router()

cookieRouter.get('/crearCookie', (req,res)=>{
    res
    .cookie('sessionId', 'valordeclave1212 objeto o lo que sea en stringfy',{maxAge: 60000})
    .send('Creando nuestra cookie')
})
cookieRouter.get('/leerCookie', (req,res)=>{
    const {sessionId}  = req.cookies
    res
    .json({message: 'Leyendo cookies', cookie: sessionId}) // mando respuesta al navegador para que no quede eesperando. la ruedita girando
})
//Cookies firmadas
cookieRouter.get('/CrearCookieFirmada', (req, res)=>{
    res
        .cookie('sessionIdFirmado', 'dfhjsdfhdsfjh898d8fs',{ signed: true})
        .json({message: 'creando cookie firmada'})
})
cookieRouter.get('/leerCookieFirmada', (req, res)=>{
    const {sessionIdFirmado}  = req.signedCookies
    res.send('Probado')
})

export default sessionRouter