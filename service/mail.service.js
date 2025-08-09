const nodemailer = require("nodemailer")

class MailService{
    constructor(){
        this.transporter = nodemailer.createTestAccount({
            host : process.env.SMTP_HOST,
            port : process.env.SMTP_PORT,
            secure : false,
            auth : {
                user : process.env.SMPT_USER,
                pass : process.env.SMPT_PASSWORD
            }
        })
    }
    async sendMail(email, activationLink){
        await this.transporter.sendMail({
            from : process.env.SMPT_USER,
            to : email,
            subject : `Akkauntingizni shu yerdan faollashtiring ${activationLink}`,
            html : `
            <div>
                <a href=${activationLink} >Aktivatsiya linki</a>
            </div>
            `
        })
    }
}


module.exports = new MailService()