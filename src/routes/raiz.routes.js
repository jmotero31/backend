import { Router } from "express";

const raizRouter = Router()

raizRouter.get('/', async (req, res)=>{
    try {
        res.send('Bienvenido al servidor @ Usted se encuentra en la Pagina Principal')
    } catch (error) {
        res.send(error)
    }
})

export default raizRouter