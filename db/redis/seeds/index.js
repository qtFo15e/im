/**
 * Created by ThinkPad on 2017/1/10.
 */
const Redis = require( 'ioredis' )
const redis = new Redis()
const ns = require( "../../../config/index" ).myDev.redisNamespace


redis,hget( "_SOCKET", "chi@qq.com" ).then( function ( a,c ) {
  console.log( a, c )
} )
