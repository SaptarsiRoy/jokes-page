/*
    creates a transport object for sending emails
*/
// import nodemailer from 'nodemailer';
const nodemailer = require('nodemailer');

// use dotenv
require('dotenv').config({ path: '.env.local' });

// create a transport object for sending emails
const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD,
    },
    secure: true,
});

// export transport object
module.exports = transporter;