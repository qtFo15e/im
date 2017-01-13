var express = require('express');
var router = express.Router();
const captchapng = require('captchapng')
const moment = require('moment');
const _ = require( "underscore" )

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post( "/signup", function ( req, res ) {

} )


function getCaptchaSeed() {
    let primarySeed = "" + _.random( 0, 10000 )
    //0001 0010 0100 1000
    let seed
    switch ( primarySeed.length ) {
        case 1:
            seed = "000" + primarySeed
            break
        case 2:
            seed = "00" + primarySeed
            break
        case 3:
            seed = "0" + primarySeed
            break
        case 4:
            seed = primarySeed
    }
    return seed
}

router.get( '/captcha/:user_id', function ( req, res ) {
    let seed = getCaptchaSeed()
    let picture = new captchapng( 80, 30, seed )  // width,height,numeric captcha
    picture.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    picture.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    let img = picture.getBase64()
    let imgBase64 = new Buffer(img,'base64');
    res.type('png').send( imgBase64 );
} )

router.post( '/login', function ( req, res ) {
  //todo 有效性检查待添加
  let { email , password } = req.body

  req.db
    .multi()
    .select( 0 )
    .hgetall( req.body.email )
    .exec()
    .then( function ( arr ) {
      let user = req.util.getLastReply( arr )
      if ( user === null || user.password !== password ) {
        res
          .status( 400 )
          .send( "账号不存在或密码错误" )
        return
      }
      // todo 返回的信息可能需要过滤，部分信息只在内部使用res
      res
        .cookie( "sessionID", "456", {
          //修正市区后，设置两小时的有效时间
          //todo 局域网IP
          domain: "localhost",
          expires: new Date( new Date().getTime() + 36000000 ),
          httpOnly: true,
        } )
        .send( user )
    } )
} )



module.exports = router;
