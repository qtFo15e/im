var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var RedisStore = require('connect-redis')(session);

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
app.use(cookieParser("123456"));
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use( session( {
  //todo expries区别
  cookie: {
    expires: new Date( new Date().getTime() + 36000000 ),
  },
  secret: '123456',
  name:"sessionID",
  resave: true,
  saveUninitialized: false,
  store: new RedisStore( {
    host:"127.0.0.1",
    port: "6379",
    prefix: "session:",
    db:6
  }  ),
} ) )


app.use( function ( req, res, next ) {
  req.db = require( "../db/redis/index" )
  // req.udb = require( "../db/nedb" )

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
