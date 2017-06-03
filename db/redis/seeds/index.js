/**
 * Created by ThinkPad on 2017/1/10.
 */
const Redis = require( 'ioredis' )
const redis = new Redis()
const ns = require( "../../../config/index" ).myDev.redisNamespace

redis.keys( "_SESSION:*" ).then( function ( arr ) {

  arr.forEach( function ( item ) {
    console.log( item )
    redis.del( item )
  } )
} )
