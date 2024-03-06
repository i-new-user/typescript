import nodemailer from 'nodemailer'
import { settings } from '../settings'


export const emailAdapter = {

    async sendEmail(email: string, subject: string, message: string){
        let transport = await nodemailer.createTransport({
            // host: 'smtp.mail.ru',
            // port: 465,
            // secure: true,
            service: 'gmail',
            auth: {
                user: 'gost29090@gmail.com',
                pass: settings.GMAIL_PASSWORD
    
                // user: 'gsv9026@mail.ru',
                // pass: settings.MAIL_RU_PASSWORD
            }
        })
    
    
        let info = await transport.sendMail({
            from: 'Stanislav <gost29090@gmail.com>',
            // from: 'Stanislav <gsv9026@mail.ru>',
            to: email,
            subject: subject,
            html: message
        })

        return info
             
    }
}

