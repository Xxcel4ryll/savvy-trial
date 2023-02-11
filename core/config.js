// import * as dotenv from 'dotenv';
// dotenv.config();
require('dotenv').config();
// const databaseInteferace = require('./interface');

module.exports = {
  appEnv: process.env.NODE_ENV,
  port: process.env.PORT || 1900,
  encrypt: {
    hashKey: process.env.SHA_512_HASH,
  },
  otp: {
    digits: Number(process.env.OTP_DIGITS || 4),
    ttlSeconds: Number(process.env.OTP_TTL_SECONDS || 30 * 60),
  },
  sms: {
    termiiApiKey: process.env.TERMII_API_KEY,
    termiiBaseUrl:
      process.env.TERMII_BASE_URL || 'https://api.ng.termii.com/api',
  },
  payment: {
    paystackPublicKey: process.env.PAYSTACK_PUBLIC_KEY,
    paystackSecretKey: process.env.PAYSTACK_SECRET_KEY,
    paystackApiUrl: process.env.PAYSTACK_API_URL || 'https://api.paystack.co',
  },
  email: {
    host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE || false,
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
  },
  database: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    // dialect: process.env.DB_DIALECT,
    // dialect: 'postgres',
    dialect: 'mysql',
    timezone: '+01:00',
    logging: true,
  },
};
