var express = require("express");
var router = express.Router();
var User = require("../models/user");
var EmailToken = require("../models/emailToken");

router
    .route("/:token")
    .get((req, res, next) => {
        try {
            const getToken = () => {
                return new Promise((resolve, reject) => {
                    resolve(EmailToken.findOne());
                })
            };

            const verify = async () => {
                const tokenObj = await getToken();
                const token = tokenObj.token;

                const jsonReceived = decodeURIComponent(req.params.token);
                const unpacked = JSON.parse(jsonReceived);

                const recToken = unpacked.token;

                if (recToken == token) {        
                    console.log("Token confirmed.");
                    User.create(unpacked.user);
                    
                    // Confirm successful page
                    res.send("Your Email is confirmed!");
                } else {
                    console.error("Token does not match!");
                    // Confirm failed page
                    res.send("Confirmation failed!\n" +
                        "Some unexpected error has occured:\n\t"
                        + err);
                }
                EmailToken.destroy(
                    {where: {id: 1}}
                );
            }
            verify();
        } catch (err) {
            console.error(err);
            // Confirm failed page
            res.send("Confirmation failed!\n" +
                "Some unexpected error has occured:\n\t" + err);
        }
    });

module.exports = router;
