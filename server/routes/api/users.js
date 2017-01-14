var express = require('express');
var router = express.Router();
const captchapng = require('captchapng')
const moment = require('moment');
const _ = require( "underscore" )

/* GET users listing. */
router.get('/', function(req, res, next) {

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
  let { email , password: loginPassword } = req.body

  req.db
    .get( email + req.ns.SEPARATOR +  req.ns.AUTH )
    .then( function ( userPassword ) {
      if ( userPassword === null || loginPassword !== userPassword ) {
        res
          .status( 400 )
          .send( "账号不存在或密码错误" )
        return
      }

      req.db
        .hgetall( email + req.ns.SEPARATOR + req.ns.PROFILE )
        .then( function ( profile ) {
          res.send( profile )
        } )
    } )
} )



module.exports = router;
