var express = require('express');
var router = express.Router();
var User = require("../models/user");
const bcrypt = require('bcrypt');
const idGen = require("../util/idgen");
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
        //User.sync()
        Promise.all([isDuplicateEmail(newUser), isDuplicateUser(newUser)])
            .then((newUser) => {
                const saltRounds = 10;
                const salt = bcrypt.genSaltSync(saltRounds)
                const hash = bcrypt.hashSync(req.body.password, salt);
                
                const test_user = User.create({
                    id: idGen(),
                    username: req.body.username,
                    email: req.body.email,
                    salt: salt,
                    hash: hash,
                    access_token: generateAccessToken(req.body.username),
                    
                });

                res.send({
                    message: "registration successful!"
                });
            })
            .catch((err) => res.send({
                message: err
            }))
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