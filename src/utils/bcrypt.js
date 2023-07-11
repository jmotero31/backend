import bcrypt from 'bcrypt'
import config from '../config/config.js'

//Con este modulo genero la operacion.Encripta la contrasena por parametro y la devuelve
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(config.bcrypt_salt)))

//devuelve un true o false 
export const validatePassword = (passwordSend, passwordBDD) => bcrypt.compareSync(passwordSend, passwordBDD)