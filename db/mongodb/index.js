/**
 * Created by ThinkPad on 2017/1/18.
 */

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/im';

module.exports = MongoClient.connect( url )
