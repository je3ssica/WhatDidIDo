var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'whatdidido',
  port: '8889',
  multipleStatements: true
});

connection.connect(function(err){
    if (err) {
        console.log(err);
    } else {
        console.log("connected");
    }
});

module.exports = connection;

// var mongoose = require('mongoose');
//
// dbConnect = function(){
//   var url = 'mongodb://localhost/whatdidido';
//   mongoose.connect(url);
// };
//
// var users = mongoose.Schema({
//   firstName: String,
//   email: String,
//   password: String,
//   clients: [{
//     company: String,
//   }],
//   projects: [{
//     project: String€
//   }]
// }, {
//   collection: 'users'
// });
//
// var usersModel = mongoose.model('User', users);
//
// var clients = mongoose.Schema({
//   company: String,
//   id: Number
// }, {
//   collection: 'clients'
// });
//
// var clientsModel = mongoose.model('Client', clients);
//
// var projects = mongoose.Schema({
//   id: Number,
//   name: String,
//   company: [{type: mongoose.Schema.Types.ObjectId, ref: 'Client'}],
//   responsible: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
// }, {
//   collection: 'projects'
// });
//
// var projectsModel = mongoose.model('Project', projects);
//
// module.exports = {
//   dbConnect,
//   users,
//   usersModel,
//   clients,
//   clientsModel,
//   projects,
//   projectsModel
// }
