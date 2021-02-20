var express = require("express");
var router = express.Router();
var User = require("../models/user");
var EmailToken = require("../models/emailToken");
const bcrypt = require("bcrypt");
const idGen = require("../util/idgen");
const verifyEmail = require("../util/verifyEmail");
const auth = require("../middleware/authentication");
const isDuplicateUser = auth.isDuplicateUser;
const isDuplicateEmail = auth.isDuplicateEmail;
const generateAccessToken = auth.generateAccessToken;
const current = new Date();

router.route('/')
.get((req,res,next) => {
    res.render("edusearch_signup");
})
.post((req, res, next) => {
    try {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.password, saltRounds);

        const new_user = {
            id: idGen(),
            name: req.body.username,
            email: req.body.email,
            salt: salt,
            hash: hash,
            access_token: generateAccessToken(req.body.username),
        }

        const emailToken = verifyEmail(new_user);

        EmailToken.create({
            id: 1,
            token: emailToken,
        });
        
        // Register success page
        res.send("Registration successful!\n" +
            "Please check your email.");
    } catch (err) {
        console.error(err);
        // Register fail page
        res.send("Registration failed!\n" +
            "Some unexpected error has occured:\n\t" + err);
    }

});

module.exports = router;
