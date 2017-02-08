/**
 * Created by ThinkPad on 2017/2/2.
 */

var Promise = require( "bluebird" )

function group( io, socket,data, callback , status ) {
  io.mongo.collection( "user" ).findOne( { email: socket.handshake.session.email }, { fields: { imGroup: 1 } } )
    .then( function ( doc ) {
      doc.imGroup.forEach( function ( item ) {
        if ( status === "userJoin" ) {
          socket.join( item )
        } else {
          socket.leave( item )
        }

        //todo 群组不显示用户状态
        // socket.broadcast.in( item ).emit( 'message', {
        //   route: 'userStatus',
        //   event: status,
        //   body: {
        //     email: socket.handshake.session.email
        //   }
        // } );
      } )
    } )
}

function user( io, socket, data, callback ,status ) {
  io.mongo.collection( "user" ).findOne( { email: socket.handshake.session.email }, { fields: { contacts: 1 } } )
    .then( function ( doc ) {
      return Promise.filter( doc.contacts, function ( email ) {
        return io.redis.hget( io.ns.SOCKET, email ).then( function ( socketId ) {
          if ( socketId ) {
            socket.broadcast.to( socketId ).emit( 'message', {
              route: "userStatus",
              event: status,
              body: {
                email: socket.handshake.session.email
              }
            } );
            return true
          }
        } )
      } )
    } )
    .then( callback )
}

//todo 群组暂时不显示用户状态
module.exports = {
  login( io, socket, data, callback ){
    io.redis.hset( io.ns.SOCKET, socket.handshake.session.email, socket.id  )

    group( io, socket,data, callback , 'userJoin' )
    user( io, socket,data, callback , 'userLogin' )
  },
  logout( io, socket, data, callback ){
    group( io, socket,data, callback , 'userLeave' )
    user( io, socket, data, callback , 'userLogout' )

    io.redis.hdel( io.ns.SOCKET, socket.handshake.session.email )
  }
}



