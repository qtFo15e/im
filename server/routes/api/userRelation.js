/**
 * Created by ThinkPad on 2017/1/20.
 */


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
    //todo  添加好友目前是单向不需要验证的
    io.mongo.collection("user").findOne( { email: socket.handshake.session.email , contacts: data.body.email } )
      .then( function ( doc ) {
        if ( doc ) {
          callback( {
            status: false,
            body: "已经在好友列表中，请勿重复添加"
          } )
        }
      } )
      .then( function () {
        io.mongo.collection("user").updateOne( { email: socket.handshake.session.email }, { $push: { contacts: data.body.email } })
          .then( function (  ) {
            return io.mongo.collection("user").findOne( { email: data.body.email  }, { fields: { email:1, profile: 1, _id: 0 } })
          } )
          .then( function ( doc ) {
            callback( {
              status: true,
              body: doc
            } )
          } )
      } )
  },
  //todo 未测试
  'delete': function (io, socket, data, callback) {
    io.mongo.collection("user").updateOne({email: socket.handshake.session.email}, {$pull: {contacts: data.body.email}})
      .then( callback )
  },
}
