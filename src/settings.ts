import dotenv from 'dotenv'
dotenv.config()

export const settings = {
    MONGO_URL: process.env.MONGO_URL || 'nongodb://0.0.0.0:27017',
    JWT_SECRET: process.env.JWT_SECRET || '12345678',

    MAIL_RU_PASSWORD:  process.env.EMAIL_RU_PASSWORD || '12345',
    GMAIL_PASSWORD:  process.env.GMAIL_PASSWORD || '12345',
}