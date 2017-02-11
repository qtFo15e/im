var express = require('express');
var router = express.Router();
const captchapng = require('captchapng')
const moment = require('moment');
const _ = require( "underscore" )
const Promise = require( 'bluebird' )



router.post( "/signup", function ( req, res ) {
  req.mongo.collection( 'user' ).insertOne( {
    email: req.body.email,
    password: req.body.password,
    profile: {
      name: req.body.name
    },
    contacts: [],
    imGroup: [],
  }, function () {
    res.end()
  } )
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

router.get( '/captcha/:random', function ( req, res ) {
    let seed = getCaptchaSeed()

    req.session.captcha = seed

    let picture = new captchapng( 80, 30, seed )  // width,height,numeric captcha
    picture.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    picture.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    let img = picture.getBase64()
    let imgBase64 = new Buffer(img,'base64');

    res.type('png').send( imgBase64 );
} )


function loadUserInfo( req, res, doc ) {
  let findImGroup = Promise.map( doc.imGroup, function ( imGroupId ) {
    return req.mongo.collection( 'imGroup' ).findOne( { imGroupId: imGroupId }, { fields: { _id: 0 } } )
  } )
  let findContacts = Promise.map( doc.contacts, function ( email ) {
    return req.mongo.collection( 'user' ).findOne( { email: email }, { fields: { email: 1, profile: 1 , _id: 0 } } )
  } )

  Promise.all( [ findImGroup, findContacts ] )
    .then( function ( [ imGroup, contacts ]  ) {
      doc.imGroup = imGroup
      doc.contacts = contacts
      res.send( _.omit( doc, 'password' ) )
    } )
}

router.post( '/login', function ( req, res ) {
  //todo 有效性检查待添加
  //todo 同一浏览器多用户 清空cookie
  //todo 同一浏览器登录多个用户
  // if( req.session.email && req.body.email ) {
  //
  // }
  //
  // req.redis.hget( req.ns.SOCKET, req.session.email )
  //   .then( function ( sockedId ) {
  //     if ( sockedId ) {
  //       res.status( 400 ).send( "用户已经登录" )
  //       return false
  //     }
  //     return true
  //   } )
  //   .then( function ( unique ) {
  //     if ( unique ) {
  //
  //     }
  //   } )


  if ( req.session.email && !req.body.email ) {
    req.mongo.collection( 'user' ).findOne( { email: req.session.email }, { fields: { _id: 0 } }, function ( err, doc ) {
      if ( doc ){
        loadUserInfo( req, res, doc )
      } else {
        res.status( 400 ).send( "未保存用户登录信息" )
      }
    })
  } else {
    let { email , password: loginPassword, captcha } = req.body

    req.mongo.collection( 'user' ).findOne( { email: req.body.email }, { fields: { _id: 0 } }, function ( err, doc ) {
      if ( doc === null || loginPassword !== doc.password  ) {
        res.status( 400 ).send( "账号不存在或密码错误" )
      } else if ( captcha !== req.session.captcha ) {
        res.status( 400 ).send( "验证码错误" )
      } else {
        if ( req.body.savePassword ) {
          req.session.cookie.expires = new Date( new Date().getTime() + 36000000 )
        }
        req.session.email = email

        //载入用户信息
        loadUserInfo( req, res, doc )
      }
    } )
  }
})


router.get( '/logout', function ( req, res ) {
  req.session.destroy( function () {
    res.clearCookie( 'sessionID' ).send( "退出成功" )
  } )
} )

module.exports = router;
