/**
 * Created by ThinkPad on 2017/1/13.
 */
var express = require('express');
var router = express.Router();

var multer  = require('multer')
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

router.post( "/photoUpload", upload.single('photo') ,function ( req, res ) {
  req.db.set( "foo", new Buffer( req.file.buffer ) )
  res.send( "ok" )
} )


router.get( '/photo', function ( req, res ) {
  req.db.getBuffer( 'foo', function ( err, result ) {
    res.type( 'png' ).send( result )
  } )
} )


module.exports = router
