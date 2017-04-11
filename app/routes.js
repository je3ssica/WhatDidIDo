var db = require('../config/database.js');
var bcrypt = require('bcryptjs');

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

      db.dbConnect();

      db.usersModel.find({'email': email}, function(err, users){
      if(err) {
        throw err;
      } else if(users == 0){
        console.log('There is no such user');
      } else {
        console.log(users);
        var dbPassword = users[0].password;

        if(bcrypt.compareSync(password, dbPassword)){
          console.log("Rätt lösenord");
          res.redirect('/dashboard');
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

      db.dbConnect();

        db.usersModel.find({'email': email}, function(err, users){
        if(err) {
          throw err;
        } else if(users > 0){
          console.log('The email already exists');
        } else {
          db.usersModel.create({firstName: firstName, email: email, password: hashedPw}, function(err, user){
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
            user : req.user // get the user out of session and pass to template
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
