import { Router } from "express";
import { userModel } from "../models/Users.js";

const userRoute = Router()

userRoute.get('/', async (req, res)=>{
    try {
        const usuariosTodos = await userModel.find({},{_id: 0, __v: 0}).sort({last_name: 1})
        //const usuariosArray = Object.values(usuariosTodos)
        const adapUsuariosTodos = usuariosTodos.map((p)=>p.toJSON())
        //console.log(typeof usuariosArray)
        res.render('user',{usu: adapUsuariosTodos})      
    } catch (error) {
        res.send(`El dato se encuentra registrado: ${error}`)
    }
})
export default userRoute