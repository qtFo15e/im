/**
 * Created by ThinkPad on 2017/1/20.
 */


module.exports = {
  'add': function (io, socket, data, callback) {
    io.mongo.collection("user").updateOne({email: socket.handshake.session.email}, {$push: {contacts: data.body.email}})
  },
  'delete': function (io, socket, data, callback) {
    io.mongo.collection("user").updateOne({email: socket.handshake.session.email}, {$pull: {contacts: data.body.email}})
  },

}
