import mongoose from 'mongoose'
import config from './config.js'

mongoose.connect(config.mongo_url_atlas)
    .then(()=> console.log("DB is connected"))
    .catch((error) => console.log("Error en MongoDB Atlas : " , error))