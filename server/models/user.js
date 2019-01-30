var mongoose = require('mongoose');

var user = mongoose.model('user',{
    email : {
    type:  String,
    minlength: 1,
    trim: true
    }
}) ;

module.exports = {
    user
};
