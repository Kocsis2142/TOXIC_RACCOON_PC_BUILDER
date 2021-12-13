var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let GoogleAccount = mongoose.model('GoogleAccounts', 
               new Schema({ email: String, name: String, picture: String, locale: String, sub: String, privilege: String }), 
               'googleAccounts'); 

module.exports = GoogleAccount