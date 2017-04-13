var db = require('../config/database.js');

module.exports.getClients = function(){
  var clients = db.clientsModel.find({}, function(err, clients){
    if(!err){
      console.log(clients);
    }else throw err;
  });
};
