var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema ({
  title: {type:String},
  name: {type:String},
  image:{type:String},
  address: {type:String},
  company: {type:String},
  phone:{
    type:Number}
});

var User = mongoose.model('User', userSchema);
module.exports = User;
