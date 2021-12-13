var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let Components = mongoose.model('Components', 
               new Schema({}), 
               'components');

module.exports = Components