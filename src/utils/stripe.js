import Stripe from "stripe"
import config from '../config/config.js'

const stripe = new Stripe(config.stripe)

export const createSession = (req,res) =>{
    stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    name: name,
                    description: description,
                },
                currency: 'usd',
                unit_amount: 20000
            }
        ]
    })
}