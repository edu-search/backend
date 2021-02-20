var express = require('express');
var router = express.Router();
var User = require("../models/user");
var EmailToken = require("../models/emailToken");
const bcrypt = require('bcrypt');
const idGen = require("../util/idgen");
const verifyEmail = require("../util/verifyEmail");
const auth = require("../middleware/authentication");
const isDuplicateUser = auth.isDuplicateUser;
const isDuplicateEmail = auth.isDuplicateEmail;
const generateAccessToken = auth.generateAccessToken;
const current = new Date();

router.route('/')
    .get((req, res, next) => {
        res.render("edusearch_signup");
    })
    .post((req, res, next) => {
        const newUser = req.body;
        // User.sync()
        Promise.all([isDuplicateEmail(newUser), isDuplicateUser(newUser)])
            .then((newUser) => {
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
                };

                const emailToken = verifyEmail(new_user);

                EmailToken.create({
                    id: 1,
                    token: emailToken,
                });
        
                // Register success page
                res.send("Registration successful!\n" +
                    "Please check your email.");
            })
            .catch((err) => {
                console.error(err);
                // Register fail page
                res.send("Registration failed!\n" +
                    "Some unexpected error has occured:\n\t" + err);
            })
    });

//separate checking for checking buttons
router.route("/check_username")
    .get((req, res, next) => {
        isDuplicateUser(req.body)
            .then((user) => {
                res.send({
                    message: user.username + " is available!"
                })
            })
            .catch((err) => {
                res.send({
                    message: err
                })
            })
    })

router.route("/check_email")
    .get((req, res, next) => {
        isDuplicateEmail(req.body)
            .then((user) => {
                res.send({
                    message: user.email + " is available!"
                })
            })
            .catch((err) => {
                res.send({
                    message: err
                })
            })
    })

module.exports = router;