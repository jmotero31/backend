import twilio from 'twilio'
import config from '../config/config.js'

const client = twilio(config.twilio_SID, config.twilio_token)

export const createsms = async()=>{
    try {
        await client.messages.create({
             from: 'whatsapp:+542214354140',
             body: 'Prueba!',
             to: config.twilio_number
           })      
    } catch (error) {
       console.log(error) 
    }
}