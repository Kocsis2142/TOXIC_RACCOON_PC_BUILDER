var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let CustomBuilds = mongoose.model('CustomBuilds', 
               new Schema({
                BUILD_NAME: String,
                USER_NAME: String,
                USER_EMAIL: String,
                BUILD_PRICE: Number,
                BUILD_ID: String,
                COMPONENT_LIST: Array
                }),
                    'customBuilds');

module.exports = CustomBuilds