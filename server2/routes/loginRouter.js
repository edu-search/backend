var express = require('express');
var router = express.Router();
var auth= require('../middleware/authentication');
var generateAccessToken = auth.generateAccessToken;
const authenticateUser = auth.authenticateUser;


router.route('/')
.get((req,res,next) => {
    res.render("edusearch_login");
})
.post((req, res, next) => {
    authenticateUser(req.body)
    .then((user) => {   
                        const token = generateAccessToken(user.username);
                        res.cookie('token', token, {
                            httpOnly: true,
                        });
                        res.send({message: "Dear " + user.username + ": authentication successful"});
                        
                        })
    .catch((err) => res.send({message: err}));

});

module.exports = router;
