/**
 * Created by ThinkPad on 2017/2/2.
 */


// imGroupId, email,

module.exports = {
  //todo 待定
  text: function ( io, socket, data, callback ) {
    socket.broadcast.to( data.body.imGroupId ).emit( 'text', {
      text: data.body.text,
      email: data.body.email
    } )
  },
  file: function ( io, socket, data, callback ) {

  }
}
