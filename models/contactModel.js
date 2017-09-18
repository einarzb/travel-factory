var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema ({
  title: {type:String},
  name: {type:String},
  image:{type:String},
  address: {type:String},
  company: {type:String},
  companyAddress: {type:String},
  phone:{
    type:Number
  },
  lng: {type:Number},
  lat: {type:Number}
});

var Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
