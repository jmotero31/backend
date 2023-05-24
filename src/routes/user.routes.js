import { Router } from "express";
import { userModel } from "../models/Users.js";

const userRoute = Router()

userRoute.get('/', async (req, res)=>{
    try {     
        const usuariosTodos = await userModel.find({},{_id: 0, __v: 0}).sort({last_name: 1})
        //const usuariosArray = Object.values(usuariosTodos)
        const adapUsuariosTodos = usuariosTodos.map((p)=>p.toJSON())
        //console.log(typeof usuariosArray)
        //res.send(usuariosTodos)
        res.render('user',{usu: adapUsuariosTodos})      
    } catch (error) {
        res.send(`El dato se encuentra registrado: ${error}`)
    }
})
export default userRoute


/*
await userModel.create([
    {
      first_name: 'Emili',
      last_name: 'Erli',
      email: 'emili@erli.com',
      gender: 'F'
    },
    {
      first_name: 'Hector',
      last_name: 'Her',
      email: 'Hector@Her.com',
      gender: 'M'
    },
    {
      first_name: 'Leonardo',
      last_name: 'Ler',
      email: 'Leonardo@Ler.com',
      gender: 'M'
    },
    {
      first_name: 'Lucia',
      last_name: 'Lu',
      email: 'Lucia@Lu.com',
      gender: 'F'
    },
    {
      first_name: 'Martin',
      last_name: 'Mart',
      email: 'Martin@Mart.com',
      gender: 'M'
    }
  ])
  */