var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require("mysql2");
var bodyParser = require('body-parser');
var cors = require("cors");
var app = express();
require('dotenv').config({path: ".env"});

var corsOptions = {
  origin: "http://localhost:3000" //url of front end
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//routes setup
var loginRouter = require('./routes/loginRouter');
var signupRouter = require('./routes/signupRouter');
var faqRouter = require('./routes/faqRouter');

// view engine setup: not relevant cuz using react
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//set up routers, express.static('public') makes linking to src easier by using path /SRCTYPE/SRC in .ejs files in views
app.use('/edusearch_login', loginRouter);
app.use('/edusearch_login', express.static('public'));
app.use('/edusearch_signup', signupRouter);
app.use('/edusearch_signup', express.static('public'));
app.use('/faq', faqRouter);
app.use('/faq', express.static('public'));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
