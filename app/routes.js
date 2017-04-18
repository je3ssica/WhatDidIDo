var db = require('../config/database.js');
var bcrypt = require('bcryptjs');
var clients = require('./getClients.js');
var session = require('express-session');

module.exports = function(app, passport) {
  var sess;
  var loggedOutMenu = [
    { text: 'About', link: '/about' },
    { text: 'Register', link: '/signup' },
    { text: 'Login', link: '/login' }
  ];
  var loggedInMenu = [
    { text: 'About', link: '/about' },
    { text: 'Settings', link: '/profile'},
    { text: 'LogOut', link: '/about' }
  ]

  app.get('/', function(req, res) {

    res.render('pages/index.ejs', {menu:loggedOutMenu});
  });

  app.get('/login', function(req, res) {
    res.render('pages/login.ejs', {menu:loggedOutMenu});
  });

  app.post('/login', function(req,res){
    var email = req.body.email,
    password = req.body.password;

    db.query("SELECT * FROM users WHERE email='"+email+"';", function(err, users){
      if(err) {
        throw err;
      } else if(users == 0){
        console.log('There is no such user');
      } else {
        var dbPassword = users[0].password;

        if(bcrypt.compareSync(password, dbPassword)){
          console.log("Rätt lösenord");
          sess=req.session;
          sess.user = users[0].firstName;

            // res.render('dashboard.ejs', {user:users[0]});
            res.redirect('/dashboard');
        } else {
          console.log("fel lösenord");
          res.redirect('/login')
        };
      }

    });
  });



  app.get('/signup', function(req, res) {
    res.render('pages/signup.ejs', {menu:loggedOutMenu});
  });


  app.post('/signup', function(req,res){
    var firstName = req.body.first_name,
    email = req.body.email,
    password =  req.body.password,
    password2 = req.body.password2;

    if(password == password2) {
      var salt = bcrypt.genSaltSync(10);
      var hashedPw = bcrypt.hashSync(password, salt);
    } else {
      console.log('Passwords do not match');
    }
    db.query(" SELECT * FROM users WHERE email='" + email + "';", function (err, users) {
      if(err) {
        throw err;
      } else if(users.length > 0){
        console.log('The email already exists');
        res.redirect('/signup');
      } else {
        db.query("INSERT INTO users(firstName, email, password) VALUES ('" + firstName + "','" + email +"','" + hashedPw +"');", function(err, user){
          if(err){
            throw err;
          } else {
            console.log('Registration succesful' + user);
            res.redirect('/');
          }
        });
      }
    });
  });


  app.get('/dashboard', function(req, res) {
    if(sess.user){
      res.render('pages/dashboard.ejs', {
        user : sess.user, // get the user out of session and pass to template
        menu: loggedInMenu
      });
    }

  });


  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
  return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}
