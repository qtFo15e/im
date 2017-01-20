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
    {
      email: "123@qq.com",
      password: '123465',
      profile: {
        name: "casd",
        sex: '女',
        age: "45",
        birthdat: '2017-8-8',
        signature: '签名',
        province: '吉林省',
        city: '长春市',
      },
      contacts: [],
      imGroup: [],
    },
    {
      email: "chi@qq.com",
      password: '123456',
      profile: {
        name: "ewqeqw",
        sex: '女',
        age: "5",
        birthdat: '2017-8-8',
        signature: '签名',
        province: '吉林省',
        city: '长春市',
      },
      contacts: [],
      imGroup: [],
    }
  ], function () {
    db.close()
  } )

});


