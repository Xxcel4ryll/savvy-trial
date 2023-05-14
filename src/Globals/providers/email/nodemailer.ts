/* eslint-disable @typescript-eslint/no-var-requires */
import * as nodemailer from 'nodemailer';
import { Logger } from '../log';

const config = require('../../../../core/config');

export default class Nodemailer {
  host = config.email.host;
  port = config.email.port;
  user = config.email.user;
  orgName = config.email.orgName;
  password = config.email.password;
  secure = config.email.secure;
  enableTestAccount: boolean;

  constructor(enableTestAccount = false, private Log = Logger) {
    this.enableTestAccount = enableTestAccount;
  }

  async createTransport() {
    let mailAccount;
    if (this.user && this.password) {
      mailAccount = {
        user: this.user,
        pass: this.password,
      };
    } else {
      if (this.enableTestAccount === true) {
        mailAccount = await nodemailer.createTestAccount();
        this.host = 'smtp.ethereal.email';
        this.port = 587;
      } else {
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
      from: fromName
        ? `${fromName} <${fromId}>`
        : `${this.orgName} <${this.user}>`,
      subject: subject,
      html: message,
    };

    this.Log.logg({
      type: 'success',
      message: `within message sender with data : ${emailData}`,
    });
    try {
      const info = await transporter.sendMail(emailData);
      this.Log.logg({
        type: 'success',
        message: `Message sent: ${info.messageId}`,
      });

    } catch (error) {
      this.Log.logg({
        type: 'danger',
        message: `Message failed: ${error.message}`,
      });
      throw error.message;
    }
  }
}
