import { Router } from "express";

const raizRouter = Router()

raizRouter.get('/', async (req, res)=>{
    try {
        res.render('home', {
            titulo: "Curso de Banckend",
            cuerpo: 'Estamos en la Raiz de la APP'
        })
    } catch (error) {
        res.send(error)
    }
})

export default raizRouter