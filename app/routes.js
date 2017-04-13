var db = require('../config/database.js');
var bcrypt = require('bcryptjs');
var clients = require('./getClients.js');

module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  app.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('error_msg') });
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
          console.log(users[0]._id);
          // db.projectsModel.find({responsible: users[0]._id}, function(err, clients){
          //   console.log(clients);
            res.render('dashboard.ejs', {user:users[0]});
          // })
        } else {
          console.log("fel lösenord");
          res.redirect('/login')
        };
      }

    });
  });



  app.get('/signup', function(req, res) {
    res.render('signup.ejs');
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
    res.render('dashboard.ejs', {
      user : req.user, // get the user out of session and pass to template
    });
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
