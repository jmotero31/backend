
import jwt from "jsonwebtoken"
import config from "../config/config.js"

export const getRaiz =  async (req, res)=>{
    try {
        req.logger.warning(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
        if (req.cookies['access_token']) {
            jwt.verify(req.cookies['access_token'], config.jwt_private_key, (error, Credential) => {
              if (error) {
                return res.status(403).redirect('/session/login')
                //return res.status(403).json({ error: 'Not authorized' })
              }
              const userData = Credential.user
              //const cantidadEnCarrito = parseInt(localStorage.getItem('cantidad')) || 0    
              return res.render('home', {
                titulo: 'Curso de Banckend',
                cuerpo: 'Estamos en la Raiz de la APP',
                valorNav: true,
                name: userData.first_name ? `Hola, ${userData.first_name}` : 'Logueate'
              })
            })
          } else {
            res.render('home')
          }

    } catch (error) {
        res.status(500).json({message: 'error', error})
    }
}