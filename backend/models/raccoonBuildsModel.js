var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let RaccoonBuilds = mongoose.model('RaccoonBuilds', 
               new Schema({
                BUILD_NAME: String,
                USER_NAME: String,
                USER_EMAIL: String,
                BUILD_PRICE: Number,
                BUILD_ID: String,
                COMPONENT_LIST: Array
                }), 
                    'raccoonBuilds');

module.exports = RaccoonBuilds