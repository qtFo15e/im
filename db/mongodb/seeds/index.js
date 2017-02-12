/**
 * Created by ThinkPad on 2017/1/18.
 */

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');


// Connection URL
var url = 'mongodb://localhost:27017/im';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {

  db.collection( "user" ).insertMany( [
    //todo seed
  ], function () {
    db.close()
  } )

});


