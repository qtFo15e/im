/**
 * Created by ThinkPad on 2017/1/13.
 */
var express = require('express');
var router = express.Router();

var multer  = require('multer')
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })


router.post( "/photoUpload", upload.single('photo') ,function ( req, res ) {
  // todo 读seesion 会不会出现数据库的异步问题
  req.db.set(  req.session.user +  req.ns.SEPARATOR +  req.ns.PROFILE +  req.ns.SEPARATOR + req.ns.PHOTO, new Buffer( req.file.buffer ) )
    .then( function () {
      res.send( "ok" )
    } )
} )


router.get( '/photo', function ( req, res ) {
  req.db.getBuffer(  req.session.user +  req.ns.SEPARATOR +  req.ns.PROFILE +  req.ns.SEPARATOR + req.ns.PHOTO , function ( err, result ) {
    res.type( 'png' ).send( result )
  } )
} )

router.post( '/edit', function ( req, res ) {
  req.db.hmset( req.session.user +  req.ns.SEPARATOR +  req.ns.PROFILE , req.body, function ( err, result ) {
    res.send( '个人信息修改成功' )
  })
})


module.exports = router
