import dotenv from "dotenv";
import nodemailer from "nodemailer";
import {Options} from "nodemailer/lib/mailer";
import {mailerConfigService} from "./config.service";

dotenv.config()

const host = process.env.SMTP_HOST;
if (!host) {
    throw new Error('HOST is not set');
}

export class MailService {
    private provider;

    constructor() {
        this.provider = nodemailer.createTransport(
            mailerConfigService.getMailerConfig(),
            mailerConfigService.getMailerOwner(),
        );
    }

    public send(message: Options) {
        this.provider.sendMail(message, (err, info) => {
            if (err) return console.log(err.message)
            console.log('Email sent: ', info);
        });
    }
}

// export const transporter = nodemailer.createTransport(
//     {
//         host: String(process.env.SMTP_HOST),
//         port: process.env.SMTP_PORT, // 587
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: process.env.EMAIL_ADDRESS,
//             pass: process.env.EMAIL_PASSWORD
//         }
//     },
//     {
//         from: `Mailer Test <${process.env.EMAIL_ADDRESS}>`
//     }
// )