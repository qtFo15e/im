/**
 * Created by ThinkPad on 2017/1/10.
 */
const Redis = require( 'ioredis' )
const redis = new Redis()
const ns = require( "../../../config/index" ).myDev.redisNamespace

