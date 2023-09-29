import { insertManyChat } from "../services/chat.services.js"

export const getChat = async (req, res)=>{
    try {
        res.render('chat', {valorNav: true, name: `Hola, ${req.user.first_name}`, rol: req.user.rol=="administrador"? true:false})       
    } catch (error) {
        res.send(error)
    }
}
export const postChat = async(req, res)=>{
    try {
        const { email, sms } = req.body;     
        setTimeout(async()  =>{
            await insertManyChat({user: email, message: sms})
            res.status(200).render('chat', { valorNav: true, name:`Hola, ${req.user.first_name}` , rol: req.user.rol=="administrador"? true:false, carritoId: req.user.cart})
          }, 1500);              
    } catch (error) {
        res.send(error)
    }
}