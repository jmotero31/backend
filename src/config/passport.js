import passport from 'passport' //Importo el core de passport
import local from 'passport-local' //Importo la estrategia a utilizar
//import { Strategy as LocalStrategy } from 'passport-local'; otra alternativa como la de abajo para trabajar con las estarategias
import { Strategy as GithubStrategy } from 'passport-github2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { buscarUser, buscarUserId, createUser, createUserPassport } from "../controllers/user.controllers.js";
import { createHash, validatePassword } from '../utils/bcrypt.js'

const LocalStrategy = local.Strategy //Defino mi estrategia
//const GitHubStrategy = GitHub.Strategy // o en su defecto no hago esto y puedo hacer desde paspport.use('github', new GitHubStrategy), pero importando GitHubStrategy
const initializePassport = () => {
    //Defino la aplicacion de mi estrategia = LOCAL
    //---------------------------------------------------------------------------------------------------------
    //Registro de usuarios
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            const { first_name, last_name, email, gender } = req.body
            try {
                const user = await buscarUser(username) //Busco un usuario con el mail ingresado
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
    //Login de usuarios
    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await buscarUser(username)     ///username es el email
            if (!user) { //Usuario no encontrado
                console.log('usuario no encontrado')
                return done(null, false)
            }
            if (!validatePassword(password, user.password)) {
                console.log('Contraseña no valida')
                return done(null, false)        //Contraseña no valida
            }
            console.log(user)
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    })) 
    //-----------------------------------------------------------------------------------------------------------------------------
    // Defino mi estrategia = GitHub
    //------------------------------------------------------------------------------------------------------------------------------
    passport.use('github', new GithubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    }, async(accessToken, refreshToken, profile, done)=>{
        try {
            const user = await buscarUser(profile._json.email)
            if (user) return done(null, user)
            const newUser = await createUserPassport({
                first_name: profile._json.name.split(' ')[0],
                last_name: profile._json.name.split(' ')[1] || '',
                password: 'N/A',
                email: profile._json.email?profile._json.email:profile._json.login
            })
            return done(null, newUser)
        } catch (error) {
            return done('Error to login with GitHub')
        }
    }))
   //-----------------------------------------------------------------------------------------------------------------------------
    // Defino mi estrategia = Google
    //------------------------------------------------------------------------------------------------------------------------------
    passport.use('google', new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_URL
     }, async(accessToken, refreshToken, profile, cb) =>{       
        try {
            const user = await buscarUser(profile._json.name)
            if (user) return cb(null, user)
            const newUser = await createUserPassport({
                first_name: profile._json.given_name,
                last_name: profile._json.family_name,
                password: 'N/A',
                email: profile._json.name
            })
            return cb(null, newUser)
        } catch (error) {
            return cb('Error to login with Google')
        }
    }
    ));

    //-----------------------------------------------------------------------------------------------------------------------------
    //Configuracion de passport para sessiones
    // Durante el registro de un nuevo usuario solamente me quedo con el id para obtener sus datos luego
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    // Obtengo los datos del usuario que realizo el login
    passport.deserializeUser(async (id, done) => {
        const user = await buscarUserId(id)                    
        done(null, user)
    }) 
}

export default initializePassport