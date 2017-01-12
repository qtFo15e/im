/**
 * Created by ThinkPad on 2017/1/11.
 */
const Redis = require( 'ioredis' )
const redis = new Redis()


redis.on( "error", function ( err ) {
  console.log( "ERROR:" + err  )
} )

module.exports = redis
