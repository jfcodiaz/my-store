const dontenv = require('dotenv');
const fs = require('fs');

const options = {};
const env = process.env.NODE_ENV || 'dev';
const envFile = `.env.${env}`;

if(fs.existsSync(`${envFile}`)){
  options.path = envFile;
}

dontenv.config(options);

const dbUrl = process.env.DATABASE_URL || `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const config = {
  appPort: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbUrl,
  encryptSalt: parseInt(process.env.ENCRYPT_SALT, 10),
  jwtSecret: process.env.JWT_SECRET,
  smtpEmail: process.env.SMTP_EMAIL,
  smtpPassword: process.env.SMTP_PASSWORD,
  smtpPort: process.env.SMTP_PORT,
  smtpSecure: process.env.SMTP_SECURE == 'true'
}

module.exports = { config }
