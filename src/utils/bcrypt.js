import bcrypt from 'bcrypt'

//Con este modulo genero la operacion.Encripta la contrasena por parametro y la devuelve
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(process.env.SALT)))

//devuelve un true o false 
export const validatePassword = (passwordSend, passwordBDD) => bcrypt.compareSync(passwordSend, passwordBDD)