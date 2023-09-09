//import { userModel } from "../models/Users.js"
import { findAllOrderByLastName, updateUse, updateOne, findByIdUser } from "../services/user.services.js"

export const getUserAll = async (req, res)=>{
    try {     
        const users = await findAllOrderByLastName()
        
        if(users.length){
            //const userMapeado = users.map((p)=>p.toJSON())
            res.render('user',{usu: users, valorNav: true, usuario: req.user, name: req.user.nombre, rol: req.user.rol=="administrador"? true:false})      
            //res.status(200).json({message: 'Users found', users})
        }else{
            res.status(400).json({message: 'No users'})
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
        if(obj){
            if(obj.rol == 'usuario'){
                const owner = 'premium'             
                const updateUserPremium = await updateUse(id, obj, owner)
                return res.status(200).json({status: 'success', payload: updateUserPremium})
            } 
            if(obj.rol == 'premium'){
                const owner = 'usuario'             
                const updateUserPremium = await updateUse(id, obj, owner)
                return res.status(200).json({status: 'success', payload: updateUserPremium})
            }
        }else{
            return res.status(401).json({message: 'No existe usuario'})
        }
    } catch (error) {
        res.status(500).json({message: 'error', error})
    }
}
export const updateProfile = async(req, res) =>{
    try {
        const body = req.body
        const doct = Object.values(body)[0]
        switch (doct) {
            case 'ProfileImagen':
                console.log('valor', req.file)
                console.log('id', req.params.uid)
                const segmentos = req.file.destination.split('/');
                //const parteDeseada = '/' + segmentos.slice(-2).join('/');
                const user = await findByIdUser(req.params.uid)
                if(!user) return res.status(401).json({message: 'No existe usuario'})     
                const existingDocumentIndex = user.documents.findIndex(doc => doc.name === doct);
                if (existingDocumentIndex !== -1) {
                  //user.documents[existingDocumentIndex].reference = `/img/profiles/${req.file.filename}`
                  user.documents[existingDocumentIndex].reference = `/${segmentos.slice(-2).join('/')}/${req.file.filename}`
                } else {
                  // Si no existe, agrega un nuevo documento
                  user.documents.push({
                    name: doct,
                    reference: `/${segmentos.slice(-2).join('/')}/${req.file.filename}`,
                    status: true
                  })
                }
                const updateOneUser = await updateOne(req.params.uid, user)
                if (updateOneUser) {
                    return res.status(200).json({ status: 'success', payload: updateOneUser });
                  } else {
                    return res.status(500).json({ message: 'Error al actualizar el usuario' });
                  }
            case 2:
              console.log("Opción 2 seleccionada");
              break;
            case 3:
              console.log("Opción 3 seleccionada");
              break;
            default:
              console.log("Opción no reconocida");
          }
    } catch (error) {
        res.status(500).json({message: 'error', error})
    }
}
export const updateDocumentIdent = async(req, res) =>{
    try {
        const user = await findByIdUser(req.params.uid)
        if(!user) return res.status(401).json({message: 'No existe usuario'})     
        const existingDocumentIndex = user.documents.findIndex(doc => doc.name === `${req.file.fieldname}`) // esto se modifica
        if (existingDocumentIndex !== -1) {
        const imgProfilesPath = '/' + path.relative('src/public', destination)
          user.documents[existingDocumentIndex].reference = `/${path.relative('src/public', req.file.destination)}/${req.file.filename}`  // esto se modifica
        } else {
          // Si no existe, agrega un nuevo documento
          user.documents.push({
            name: `${req.file.fieldname}`, // esto se modifica
            reference: `/documents/${req.file.filename}`,// esto se modifica
            status: true
          })
        }
        const updateOneUser = await updateOne(req.params.uid, user)
        if (updateOneUser) {
            return res.status(200).json({ status: 'success', payload: updateOneUser });
          } else {
            return res.status(500).json({ message: 'Error al actualizar el usuario' });
          }
    } catch (error) {
        res.status(500).json({message: 'error', error})
    }
}