import dotenv from 'dotenv'
dotenv.config()

export const ADMIN_EMAIL= process.env.ADMIN_EMAIL
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
export const ADMIN_PROFILE_PHOTO_CLOUD_URL= process.env.ADMIN_PROFILE_PHOTO_CLOUD_URL
export const ADMIN_PROFILE_PHOTO_CLOUD_ID=process.env.ADMIN_PROFILE_PHOTO_CLOUD_ID
export const ADMIN_PROFILE_PHOTO_NAME=process.env.ADMIN_PROFILE_PHOTO_NAME
export const ADMIN_PHONENUMBER=process.env.ADMIN_PHONENUMBER
export const FRONTEND_URL=process.env.FRONTEND_URL
export const STRIPE_SECRET=process.env.STRIPE_SECRET
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET
export const TOKEN_EXPIREATION_TIME= process.env.TOKEN_EXPIREATION_TIME
export const JWT_SECRET = process.env.JWT_SECRET