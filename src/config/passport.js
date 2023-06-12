import local from 'passport-local' //Importo la estrategia a utilizar
import passport from 'passport' //Importo el core de passport
import { buscarUser, buscarUserId, createUser } from "../controllers/user.controllers.js";
import { createHash, validatePassword } from '../utils/bcrypt.js'

const LocalStrategy = local.Strategy //Defino mi estrategia
 
const initializePassport = () => {
    //Defino la aplicacion de mi estrategia
    //Registro de usuarios
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            const { first_name, last_name, email, gender } = req.body
            try {
                const user = await buscarUser(email) //Busco un usuario con el mail ingresado
                if (user) {
                    return done(null, false) //Usuario ya registrado, false no se creo ningun usuario
                }
                //Usuario no existe
                const passwordHash = createHash(password)
                const userCreated =  await createUser({
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    gender: gender,
                    password: passwordHash
                })
                console.log(userCreated)
                return done(null, userCreated)
            } catch (error) {
                return done(error)
            }
        }))

    //Configuracion de passport para sessiones
    //Inicializar la session del user
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    //Eliminar la session del user
    passport.deserializeUser(async (id, done) => {
        const user = await buscarUserId(id)                    // falta crear funcion para buscar por id controller user
        done(null, user)
    })

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await buscarUser(username)     ///username es el email
            if (!user) { //Usuario no encontrado
                return done(null, false)
            }
            if (validatePassword(password, user.password)) {
                return done(null, user)
            }
            return done(null, false)        //Contraseña no valida
        } catch (error) {
            return done(error)
        }
    }))
}

export default initializePassport