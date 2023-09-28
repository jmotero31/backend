import dotenv from  'dotenv'

dotenv.config({path: '.env'})

export default{
    mongo_url_atlas: process.env.URL_MONGODB_ATLAS,
    port: process.env.PORT,
    salt: process.env.SALT,
    cookie_secret: process.env.SIGNED_COOKIE,
    session_secret: process.env.SESSION_SECRET,
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_url: process.env.GOOGLE_URL,
    github_client_id: process.env.CLIENT_ID,
    github_client_secret: process.env.CLIENT_SECRET,
    github_callback_url: process.env.CALLBACK_URL,
    jwt_private_key: process.env.PRIVATE_KEY,
    bcrypt_salt: process.env.SALT,
    nodemailer_gmail_user: process.env.NODEMAILER_USER,
    nodemailer_gmail_password: process.env.NODEMAILER_PASSWORD,
    twilio_token: process.env.TWILIO_AUTH_TOKEN,
    twilio_SID: process.env.TWILIO_ACCOUNT_SID,
    twilio_number: process.env.TWILIO_PHONE_NUMBER,
    around: process.env.AROUND, 
    stripe: process.env.STRIPE
}