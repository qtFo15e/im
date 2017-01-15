var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const config = require( "../config/index" )

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw())
app.use(bodyParser.text())
app.use(cookieParser( config.myDev.secret ));
//todo 暂时用不到
// app.use(require('stylus').middleware(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public')));

//todo 合并到一个数据库客户端
var session = require('express-session')
var RedisStore = require('connect-redis')(session);
app.use( session( {
  secret: config.myDev.secret,
  name:"sessionID",
  resave: false,
  saveUninitialized: false,
  store: new RedisStore( {
    host:"127.0.0.1",
    port: "6379",
    prefix: config.myDev.redisNamespace.SESSION + ":",
    disableTTL: 36000000,
  }  ),
} ) )

//登录拦截
app.use( function ( req, res, next ) {
  let isNeedLogin = config.myDev.needLoginSites.some( function ( item ) {
    return req.path.startsWith( item )
  } )

  if ( isNeedLogin && !req.session.user ) {
    res.redirect('/');
  } else {
    next()
  }
} )

//todo 跨站请求伪造： 方式：利用跨站共享cookie原理，伪装用户做出操作，cookie限制domain??


app.use( function ( req, res, next ) {
  req.db = require( "../db/redis/index" )
  req.ns = config.myDev.redisNamespace

  req.util = require( '../util/index' )
  next()
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


app.post( "/test", function ( req, res ) {

} )


app.use( "/api", require( "./routes/api/index" ))

app.get( "/", require( "./routes/index" ) )




//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });





module.exports = app;
