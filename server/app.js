var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const config = require( "../config/index" )
var router = require( './routes/api/index' )
var redis = require( "../db/redis/index" )
var mongo = require( '../db/mongodb/index' )
var util = require( '../util/index' )
var userStatus = require( './routes/api/userStatus' )
var fs = require("fs")
var ss = require('socket.io-stream');
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev', {stream: accessLogStream}));
app.use(logger('dev'));



app.get( "/test", function ( req, res ) {
  res.send( "ok" )
} )


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw())
app.use(bodyParser.text())
app.use(cookieParser( config.myDev.secret ));

// app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

var session = require('express-session')
var RedisStore = require('connect-redis')(session);
var sessionInstance = session( {
  secret: config.myDev.secret,
  name:"imSessionID",
  resave: false,
  saveUninitialized: false,
  store: new RedisStore( {
    host:"127.0.0.1",
    port: "6379",
    prefix: config.myDev.redisNamespace.SESSION + ":",
    disableTTL: 36000000,
  }  ),
} )
app.use( sessionInstance )
const sharedsession = require("express-socket.io-session");

//todo 清在线状态
redis.del( '_SOCKET' )
redis.keys( "_SESSION:*" ).then( function ( arr ) {
  arr.forEach( function ( item ) {
    redis.del( item )
  } )
} )



//登录拦截
app.use( function ( req, res, next ) {
  let isNeedLogin = config.myDev.needLoginSites.some( function ( item ) {
    return req.path.startsWith( item )
  } )

  if ( isNeedLogin && !req.session.email ) {
    res.redirect('/');
  } else {
    next()
  }
} )

//todo 跨站请求伪造： 方式：利用跨站共享cookie原理，伪装用户做出操作，cookie限制domain??


app.use( function ( req, res, next ) {
  req.ns = config.myDev.redisNamespace
  req.redis = redis
  req.util = util

  //todo 清在线状态, 不能放在中间件里 否则每次都执行
  // redis.del( '_SOCKET' )
  // redis.keys( "_SESSION:*" ).then( function ( arr ) {
  //   arr.forEach( function ( item ) {
  //     redis.del( item )
  //   } )
  // } )

  mongo.then( function ( db ) {
    req.mongo = db
    next()
  } )
} )


const webpack = require( "webpack" )
const webpackConfig = require( '../build/webpack.dev.conf' )
const compiler = webpack( webpackConfig )

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  stats: {
    colors: true,
    chunks: false,
  },
});
app.use(devMiddleware);


const hotMiddleware = require('webpack-hot-middleware')(compiler);
compiler.plugin('compilation', (compilation) => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({action: 'reload'});
    cb();
  });
});
app.use(hotMiddleware);

//todo 不清楚什么用
// const webpackAssets = require('express-webpack-assets');
// app.use( webpackAssets( './webpack-assets.json',  {
//   devMode: process.env.NODE_ENV
// }))


app.use( "/api", router.expressRouter)

app.get( "/", require( "./routes/index" ) )


var debug = require('debug')('im:server');
var http = require('http');
var port = '3000';
var server = http.createServer(app).listen(port, '0.0.0.0');
// var server = http.createServer(app).listen(port);

var io = require( "socket.io" )( server )
io.use(sharedsession( sessionInstance ));


//todo 登录过滤
io.on( "connection" , function ( socket ) {

  // todo 应该关闭socket连接
  // if ( !socket.handshake.session.email ) return

  io.redis = redis
  io.ns = config.myDev.redisNamespace
  console.log(11111111111111111111)
  mongo.then( function ( db ) {
    io.mongo = db

    // websocket是双向的， 逻辑上最好把client作为主动方
    //userStatus.login( io, socket )

    socket.on( "message", function (data, callback  ) {
      router.ioRouter( io, socket, data, callback )
    } )

    //todo 用户下线改变状态
    socket.on( "disconnect" , function () {
      userStatus.logout( io, socket )
    })

  } )
})

