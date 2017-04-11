var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var configDB = require('./config/database.js');

//mongoose.connect('mongodb://localhost/whatdidido');

require('./config/passport')(passport);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');



app.use(session({secret: 'secret'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req,res,next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

require('./app/routes.js')(app, passport);

app.listen(port);
console.log('The magic happens on port ' + port);
