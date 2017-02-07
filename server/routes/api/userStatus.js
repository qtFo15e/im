/**
 * Created by ThinkPad on 2017/2/2.
 */

var Promise = require( "bluebird" )

// function group( io, socket,data, callback , status ) {
//   io.mongo.collection( "user" ).findOne( { email: socket.handshake.session.email }, { fields: { imGroup: 1 } } )
//     .then( function ( doc ) {
//       doc.imGroup.forEach( function ( item ) {
//         socket.join( item )
//         // todo 传递已经登录的用户
//         socket.broadcast.in( item ).emit( 'message', {
//           route: 'userStatus',
//           event: status,
//           body: {
//             email: socket.handshake.session.email
//           }
//         } );
//       } )
//     } )
// }

function user( io, socket, data, callback ,status ) {
  io.mongo.collection( "user" ).findOne( { email: socket.handshake.session.email }, { fields: { contacts: 1 } } )
    .then( function ( doc ) {
      Promise.filter( doc.contacts, function ( email ) {
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
      } ).then( callback )
    } )
}

//todo 群组暂时不显示用户状态
module.exports = {
  login( io, socket, data, callback ){
    // console.log( this.arguments.length )
    io.redis.hset( io.ns.SOCKET, socket.handshake.session.email, socket.id  )

    // group( io, socket, 'login' )
    user( io, socket,data, callback , 'userLogin' )
  },
  logout( io, socket, data, callback ){
    // group( io, socket, 'logout' )
    user( io, socket, data, callback , 'userLogout' )

    io.redis.hdel( io.ns.SOCKET, socket.handshake.session.email )
  }
}



