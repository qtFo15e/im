/**
 * Created by ThinkPad on 2017/1/11.
 */


//express
const express = require( "express" )
const expressRouter =  express.Router()


var user = require( "./users" )
var profile = require( "./profile" )


expressRouter.use( "/user", require( "./users" ) )
expressRouter.use( "/profile", require( "./profile" ) )




//io
const userRelation = require( './userRelation' )
const userMessage = require( "./userMessage" )
const imGroupRelation = require( './imGroupRelation' )
const imGroupMessage = require( './imGroupMessage' )
const userStatus =  require( './userStatus' )

const app = {
  userRelation,
  imGroupRelation,
  userMessage,
  imGroupMessage,
  userStatus
}

const ioRouter = function ( io, socket, data, callback ) {
  app[ data.route ][ data.event ]( io, socket, data, callback )
}


module.exports = {
  ioRouter,
  expressRouter
}
