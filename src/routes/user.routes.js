import { Router } from "express";

const userRoute = Router()

userRoute.get('/', async (req, res)=>{
    try {
        res.send('Se encuentra en la seccion USUARIO')      
    } catch (error) {
        res.send(error)
    }
})

export default userRoute