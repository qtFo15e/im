/**
 * Created by ThinkPad on 2017/1/12.
 */

var request = require("request");

request.post({
  url:'http://localhost:3000/api/user/loginIn',
  json:{
    password:789798,
    email: "adsdas"
  }
});
