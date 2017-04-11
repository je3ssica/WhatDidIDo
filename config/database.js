var mongoose = require('mongoose');

dbConnect = function(){
  var url = 'mongodb://localhost/whatdidido';
  mongoose.connect(url);
};

var users = mongoose.Schema({
  firstName: String,
  email: String,
  password: String
}, {
  collection: 'users'
});

var usersModel = mongoose.model('User', users);

module.exports = {
  dbConnect,
  users,
  usersModel
}
