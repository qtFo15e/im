/**
 * Created by ThinkPad on 2017/2/2.
 */

module.exports = {
  text: function ( io, socket, data, callback ) {
    io.redis.hget( io.ns.SOCKET, data.body.receiver ).then( function ( socketId ) {
      socket.broadcast.to( socketId ).emit( 'message', {
        route: "userMessage",
        event: "text",
        body: {
          sender: socket.handshake.session.email,
          value: data.body.value
        }
      });
    } )
    callback()
  },
  file: function ( io, socket, data, callback , stream) {
    var filename = path.basename(data.name);
    stream.pipe(fs.createWriteStream(filename));
  }
}
