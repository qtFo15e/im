/**
 * Created by ThinkPad on 2017/2/2.
 */


// imGroupId, email,

module.exports = {
  text: function ( io, socket, data, callback ) {
    console.log( "s 收到" )
    socket.broadcast.to( data.body.receiver ).emit( 'message', {
      route: "imGroupMessage",
      event: "text",
      body: {
        receiver: data.body.receiver,
        sender: socket.handshake.session.email,
        value: data.body.value
      }
    });
    callback()
  },
  file: function ( io, socket, data, callback ) {

  }
}
