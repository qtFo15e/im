var express = require('express');
var router = express.Router();
const captchapng = require('captchapng')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post( "/signUp", function ( req, res ) {

} )

router.post( '/loginIn', function ( req, res ) {
  //todo 有效性检查
  let { email , password } = req.body

  req.db
    .multi()
    .select( 0 )
    .hgetall( req.body.email )
    .exec()
    .then( function ( arr ) {
      let user = req.util.getLastReply( arr )
      res.send( [
        user,
        req.body
      ] )
      if ( user === null || user.password !== password ) {
        res
          .status( 400 )
          .send( "账号不存在或密码错误" )
        return
      }
      // todo 返回的信息可能需要过滤，部分信息只在内部使用res
      res
        .cookie( "sessionID", "456",{
          // 2hours
          maxAge: 7200000,
          httOnly: true,
        } )
        .send( user )
    } )
} )

router.get( '/captcha', function ( req, res ) {
  var p = new captchapng(80,30,4456); // width,height,numeric captcha
//         p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
//         p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
//
//         var img = p.getBase64();
//         var imgbase64 = new Buffer(img,'base64');
//         response.writeHead(200, {
//             'Content-Type': 'image/png'
//         });
//         response.end(imgbase64);
} )


module.exports = router;
