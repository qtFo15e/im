/**
 * Created by ThinkPad on 2017/1/10.
 */
const Redis = require( 'ioredis' )
const redis = new Redis()
const ns = require( "../../../config/index" ).myDev.redisNamespace


redis
  .multi()
  .set( "chimeng@qq.com" + ns.SEPARATOR + ns.AUTH , "123456" )
  .hmset( "chimeng@qq.com" + ns.SEPARATOR + ns.PROFILE , {
      name: "chimeng",
      age: "45",
  } )
  .exec( redis.print )
