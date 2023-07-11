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
    bcrypt_salt: process.env.SALT
}