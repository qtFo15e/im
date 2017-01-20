/**
 * Created by ThinkPad on 2017/1/20.
 */

module.exports = {
  'create': function ( io, socket, data, callback ) {
    //todo id 会暴露用户量， 如何生成多位随机数
    io.mongo.collection( "imGroup" ).count()
      .then( function ( imGroupId ) {
        imGroupId = '' + imGroupId
        io.mongo.collection( "imGroup" ).insertOne( {
          imGroupId: imGroupId,
          name: data.body.name,
          introduction: data.body.introduction,
          numbers: [socket.handshake.session.email ]
        } )
          .then( function () {
            callback( imGroupId )
          } )
      } )
  },
  'join': function ( io, socket, data, callback ) {
    io.mongo.collection( "imGroup" ).updateOne( { gourpId: data.body.imGroupId }, { $push: { numbers: socket.handshake.session.email } } )
      .then( function () {
        io.mongo.collection( "user" ).updateOne( { email: socket.handshake.session.email } , { $push: { imGroups: data.body.data.body.imGroupId } } )
      } )
  },
  'search': function ( io, socket, data, callback ) {
    let query = {}
    query[ data.body.type ] = data.body.value
    //todo  没有限制查询数量
    io.mongo.collection( "imGroup" ).find( query, {fields: { _id: 0 , numbers: 0 }} ).toArray()
      .then( callback )
  },
  'checkIn': function ( io, socket, data, callback ) {
    io.mongo.collection( "imGroup" ).findOne( { gourpId: data.body.imGroupId,  numbers: socket.handshake.session.email } )
      .then( function ( result ) {
        if ( result ) {
          callback( {
            status: false,
            ms: "已经在数组中"
          } )
        } else {
          callback ( {
            status: true
          } )
        }
      } )

  },
  'quit': function ( io, socket, data, callback ) {
    io.db.sadd(  `${io.ns.GROUP}:${data.body.imGroup}:${io.ns.NUMBERS}`, socket.handshake.session.email )
    io.mongo.collection( "imGroup" ).updateOne( { gourpId: data.body.imGroupId}, { $pull: { numbers: data.body.email } } )
      .then( function () {
        io.mongo.collection( "user" ).updateOne( { email: socket.handshake.session.email }, { $pull: { imGroups: data.body.data.body.imGroupId } } )
      } )
  }
}
