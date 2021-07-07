require('express-async-errors')
const nodemailer = require('nodemailer')
const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const sendEmail = async (email, subject, payload, templates) => {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'mailService',
        host: 'smtp.mailService.com',
        port: 465,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const source = fs.readFileSync(path.join(__dirname, templates), "utf8");
    const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };

    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        return error;
      } else {
        return res.status(200).json({
          status: 'success'
        });
      }
    });
};


module.exports = sendEmail;