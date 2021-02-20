var send = require("./email.js");
require("dotenv").config({ path: ".env" });
var jwt = require("jsonwebtoken");
const email = require("./email.js");

var mailSender = (user) => {
    try {
        const emailToken = jwt.sign(
            {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            process.env.EMAIL_SECRET,
            {
                expiresIn: "1h",
            }
        );

        const jsonPack = JSON.stringify({
            user: user,
            token: emailToken,
        });
        
        const url = `http://localhost:3001/edusearch_confirmation/${encodeURIComponent(jsonPack)}`;

        send({
            from: process.env.EMAIL,
            subject: "Complete Registeration at Edusearch.asia",
            to: user.email,
            html: `Dear ${user.name}，\n
                <p>
                Thank you for signing up at Edusearch.asia!\n
                Please click the link below to complete your registeration.\n
                </p>
                <a href="${url}">Confirm Your Email</a><br />
                <p>This is a system generated email. Please do not reply.</p>`,
        });
        return emailToken;
    } catch (err) {
        throw err;
    }
};
module.exports = mailSender;
