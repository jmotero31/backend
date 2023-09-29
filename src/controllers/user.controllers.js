//import { userModel } from "../models/Users.js"
import { findAllOrderByLastName, updateUse, updateOneUser, findByIdUser, findAll, deleteAllUsersInact, deleteUserone } from "../services/user.services.js"
import { deleteAllCartsInact, deleteOneCart } from '../services/cart.services.js'
import { mailDeleteUser } from '../utils/nodemailer.js'
export const getUserAll = async (req, res)=>{
    try {     
        const users = await findAllOrderByLastName()
        const useLogin = await findByIdUser(req.user._id)
        const perfil = useLogin.documents.find(objeto=> objeto.name == 'ProfileImagen') 
        if(users.length){
            res.render('user',{usu: users, valorNav: true, roles: useLogin.rol.toUpperCase(), image: perfil.reference, usuario: req.user, name:`Hola, ${req.user.first_name}`, rol: req.user.rol=="administrador"? true:false,  rolet: useLogin.rol=="premium"? true:false})      
        }else{
            res.status(401).render('401')
        }      
    } catch (error) {
        res.status(500).json({message: 'error', error})
    }
}
export const getFakerYou = async(req, res) =>{
    try {
        const user = []
        for(let i=0; i<20; i++){
            user.push(generateUser())
        }
        res.status(200).json({status: 'success', payload: user})
    } catch (error) {
        res.status(500).json({message: 'error', error})
    }
}
export const updatePremierUser = async(req, res) =>{
    try {      
        const id = req.params.uid
        const obj = await findByIdUser(id)
        const nombresBuscados = ['DocumentCompCuen', 'DocumentIdent', 'DocumentCompDomi']
        const allsDocuments = nombresBuscados.every(nombre => {
            return obj.documents.some(documento => documento.name === nombre)
        })       
        if(obj){
            if(obj.rol == 'usuario' && allsDocuments){
                const owner = 'premium'             
                const updateUserPremium = await updateUse(id, obj, owner)
                return res.status(200).redirect('/user')
            }else if(obj.rol == 'premium'){
                const owner = 'usuario'             
                const updateUserPremium = await updateUse(id, obj, owner)
                return res.status(200).redirect('/user')
            }else{
                res.status(500).json({message: 'faltan comprobantes'})
            }
        }else{
            return res.status(401).render('401')
        }      
    } catch (error) {
        res.status(500).json({message: 'error', error})
    }
}
export const updateProfile = async(req, res) =>{
    try {
        const segmentos = req.file.destination.split('/');
        const user = await findByIdUser(req.params.uid)
        if(!user) return res.status(401).json({message: 'No existe usuario'})     
        const existingDocumentIndex = user.documents.findIndex(doc => doc.name === req.body.filetype);
        if (existingDocumentIndex !== -1) {
            user.documents[existingDocumentIndex].reference = `/${segmentos.slice(-2).join('/')}/${req.file.filename}`
        } else {
            // Si no existe, agrega un nuevo documento
            user.documents.push({
                name: req.body.filetype,
                reference: `/${segmentos.slice(-2).join('/')}/${req.file.filename}`
            })
        }
        const updateUser = await updateOneUser(req.params.uid, user)
        if (updateUser) {
            res.status(200).redirect('/user') 
        } else {
            return res.status(500).json({ message: 'Error al actualizar el usuario' });
        }
    } catch (error) {
        res.status(500).json({message: 'error', error})
    }
}
export const deleteUserInactiv = async (req, res)=>{
    try {     
        const users = await findAll()
        if(users.length){
            const currentDate = new Date().toISOString()
            const usuariosInactivos = users.filter((usuario) => {
                const date = new Date(usuario.last_connection).toISOString()
                const timeDifference = new Date(currentDate) - new Date(date)    
                const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000 // 2 días en milisegundos
                return twoDaysInMillis < timeDifference
            })
            const idsUsuariosInactivos = usuariosInactivos.map((usuario) => usuario._id)
            const idsCarritoUsuariosInactivos = usuariosInactivos.map((usuario) => usuario.cart)
            const userDelete = await deleteAllUsersInact({ _id: { $in: idsUsuariosInactivos } })
            const cartDelete = await deleteAllCartsInact({_id: { $in: idsCarritoUsuariosInactivos }})
            if (!userDelete) return res.status(400).json({message: 'error'})    
            usuariosInactivos.forEach(async (user) => {
                await mailDeleteUser(user.email, user.last_name, user.first_name);
              })
            res.status(200).json({status: 'success', payload: idsUsuariosInactivos })        
        }else{
            res.status(400).json({message: 'No users'})
        }      
    } catch (error) {
        res.status(500).json({message: 'error', error})
    }
}
export const deleteUser = async (req, res)=>{
    try {
        const userOne = await findByIdUser(req.params.uid)
        const users = await deleteUserone(userOne._id)
        const usersCart = await deleteOneCart(userOne.cart)
        if(users) return res.status(200).redirect('/user')
        return res.status(500).redirect('/user')
    } catch (error) {
        res.status(500).json({message: 'error', error})
    }    
}