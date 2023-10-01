import passport from 'passport' //Importo el core de passport
import local from 'passport-local' //Importo la estrategia a utilizar
import { Strategy as GithubStrategy } from 'passport-github2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { validatePassword } from '../utils/bcrypt.js'
import config from './config.js';
import { findEmailUser, findByIdUser, createUser } from '../services/user.services.js'
import { createCart } from '../services/cart.services.js'
import { mailUser } from '../utils/nodemailer.js'

const LocalStrategy = local.Strategy

const cookieExtractor = req =>{
    const token = (req && req.cookies) ? req.cookies['access_token'] : null
    return token
}
const initializePassport = () => {
    //Defino la aplicacion de mi estrategia = LOCAL
    //---------------------------------------------------------------- -----------------------------------------
    //Registro de usuarios
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            const { first_name, last_name, email, gender } = req.body  
            if (!first_name || !last_name || !email || !gender || !password) return done(null, { status: "error", error: "Incomplete values" })     
            try {
                const user = await findEmailUser(username) 
                if (user) {
                    return done(null, false) 
                }
                const carrito = await createCart() 
                const cart = carrito._id.toString()  
                const userCreated =  await createUser({
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    gender: gender,
                    cart: cart,
                    password: password
                })
                await mailUser(userCreated.email, userCreated.last_name, userCreated.first_name)
                return done(null, userCreated)
            } catch (error) {
                return done(error)
            }
        }))
    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await findEmailUser(username)  
            if (!user) { 
                return done(null, false)
            }
            if (!validatePassword(password, user.password)) {
                return done(null, false) 
            }     
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    })) 
    //-----------------------------------------------------------------------------------------------------------------------------
    // Defino mi estrategia = GitHub
    //------------------------------------------------------------------------------------------------------------------------------
    passport.use('github', new GithubStrategy({
        clientID: config.github_client_id,
        clientSecret: config.github_client_secret,
        callbackURL: config.github_callback_url
    }, async(accessToken, refreshToken, profile, done)=>{
        try {
            const user = await findEmailUser(profile._json.email)
            if (user) return done(null, user)
            const carrito = await createCart()
            const cart = carrito._id.toString()
            const newUser = await createUser({
                first_name: profile._json.name.split(' ')[0],
                last_name: profile._json.name.split(' ')[1] || '',
                email: profile._json.email?profile._json.email:profile._json.login,
                cart: cart,
                password: 'N/A'
            })
            await mailUser(newUser.email, newUser.last_name, newUser.first_name)
            return done(null, newUser)
        } catch (error) {
            return done('Error to login with GitHub')
        }
    }))
   //-----------------------------------------------------------------------------------------------------------------------------
    // Defino mi estrategia = Google
    //------------------------------------------------------------------------------------------------------------------------------
    passport.use('google', new GoogleStrategy({
        clientID: config.google_client_id,
        clientSecret: config.google_client_secret,
        callbackURL: config.google_url
     }, async(accessToken, refreshToken, profile, cb) =>{       
        try {
            const user = await findEmailUser(profile._json.name)
            if (user) return cb(null, user)

            const carrito = await createCart()
            const cart = carrito._id.toString()

            const newUser = await createUser({
                first_name: profile._json.given_name,
                last_name: profile._json.family_name,
                email: profile._json.email,
                cart: cart,
                password: 'N/A'
            })
            await mailUser(newUser.email, newUser.last_name, newUser.first_name)
            return cb(null, newUser)
        } catch (error) {
            return cb('Error to login with Google')
        }
    }
    ))
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    // Obtengo los datos del usuario que realizo el login
    passport.deserializeUser(async (id, done) => {
        const user = await findByIdUser(id)                    
        done(null, user)
    }) 
}

export default initializePassport