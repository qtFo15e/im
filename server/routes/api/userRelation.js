/**
 * Created by ThinkPad on 2017/1/20.
 */

//todo 新加好友的用户状态

module.exports = {
  'search': function ( io, socket, data, callback ) {
    let query = {}
    query[ data.body.type ] = data.body.value
    //todo  没有限制查询数量
    io.mongo.collection( "user" ).find( query, {fields: { email: 1, profile: 1 , _id: 0}} ).toArray()
      .then( function ( docs ) {{
        callback( docs )
      }
      } )
  },
  'add': function (io, socket, data, callback) {
    //todo  添加好友需要验证
    io.mongo.collection("user").findOne( { email: socket.handshake.session.email , contacts: data.body.email } )
      .then( function ( doc ) {
        if ( doc ) {
          callback( {
            status: false,
            body: "已经在好友列表中，请勿重复添加"
          } )
        } else {
          io.mongo.collection("user").updateOne( { email: socket.handshake.session.email }, { $push: { contacts: data.body.email } })
            .then( function () {
              io.mongo.collection("user").updateOne( { email: data.body.email }, { $push: { contacts: socket.handshake.session.email } })
            }  )
            .then( function (  ) {
              return io.mongo.collection("user").findOne( { email: data.body.email  }, { fields: { email:1, profile: 1, _id: 0 } })
            } )
            .then( function ( doc ) {
              callback( {
                status: true,
                body: doc
              } )
            } )
            .then( function () {
              return io.mongo.collection("user").findOne( { email: socket.handshake.session.email }, { fields: { email:1, profile: 1, _id: 0 } })
            } )
            .then( function ( doc ) {
              io.redis.hget( io.ns.SOCKET, data.body.email ).then( function ( socketId ) {
                socket.broadcast.to( socketId ).emit( 'message', {
                  route: "userRelation",
                  event: "add",
                  body: doc
                });
              } )
            } )
        }
      } )
  },
  'delete': function (io, socket, data, callback) {
    io.mongo.collection("user").updateOne({email: socket.handshake.session.email}, {$pull: {contacts: data.body.email}})
      .then( function () {
        callback()
      } )
      .then( function () {
        io.mongo.collection("user").updateOne({ email: data.body.email}, {$pull: {contacts: socket.handshake.session.email}})
      } )
      .then( function () {
        io.redis.hget( io.ns.SOCKET, data.body.email ).then( function ( socketId ) {
          socket.broadcast.to( socketId ).emit( 'message', {
            route: "userRelation",
            event: "delete",
            body: {
              email: socket.handshake.session.email
            }
          });
        } )
      } )
  },
}
