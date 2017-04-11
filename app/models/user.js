var mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');

// define the schema for our user model
var userSchema = mongoose.Schema({
        first_name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true}
});


userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
//module.exports = mongoose.model('User', userSchema);
