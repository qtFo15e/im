/**
 * Created by ThinkPad on 2017/1/10.
 */
const Redis = require( 'ioredis' )
const redis = new Redis()

redis
  .multi()
  .select( 0 )
  .hmset( "chimeng@qq.com", {
      name: "chimeng",
      age: "45",
      password: "123456"
  } )
  .exec( redis.print )
