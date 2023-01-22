"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const config = require('../../../../core/config');
class Nodemailer {
    constructor(enableTestAccount = false) {
        this.host = config.email.host;
        this.port = config.email.port;
        this.user = config.email.user;
        this.password = config.email.password;
        this.secure = config.email.secure;
        this.enableTestAccount = enableTestAccount;
    }
    async createTransport() {
        let mailAccount;
        if (this.user && this.password) {
            mailAccount = {
                user: this.user,
                pass: this.password,
            };
        }
        else {
            if (this.enableTestAccount === true) {
                mailAccount = await nodemailer.createTestAccount();
                this.host = 'smtp.ethereal.email';
                this.port = 587;
            }
            else {
                throw new Error('Email credentials are required');
            }
        }
        return nodemailer.createTransport({
            host: this.host,
            port: this.port,
            secure: this.secure,
            auth: mailAccount,
        });
    }
    async send(message, options) {
        const transporter = await this.createTransport();
        const { fromName, fromId, subject, to } = options || {};
        const emailData = {
            to,
            from: fromName ? `${fromName} <${fromId}>` : fromId,
            subject: subject,
            html: message,
        };
        console.log(`within message sender with data : ${emailData}`);
        try {
            const info = await transporter.sendMail(emailData);
            console.log(`Message sent: ${info.messageId}`);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = Nodemailer;
//# sourceMappingURL=nodemailer.js.map