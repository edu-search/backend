const nodemailer = require("nodemailer");
require("dotenv").config({ path: ".env" });

// create SMTP client setup
const config = {
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
};

// create smtp transporter
const transporter = nodemailer.createTransport(config);

module.exports = function (mail) {
    transporter.sendMail(mail, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log("mail sent:", info.response);
    });
};
