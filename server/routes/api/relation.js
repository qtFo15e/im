/**
 * Created by ThinkPad on 2017/1/17.
 */

module.exports = {
  'add' : function ( io, socket, data, callback ) {
    io.mongo.collection( "user" ).updateOne( { email: socket.handshake.session.email }, { $push : { contacts: data.body.email } } )
  },
  'delete': function ( io, socket, data, callback ) {
    io.mongo.collection( "user" ).updateOne( { email: socket.handshake.session.email }, { $pull : { contacts: data.body.email } } )
  },

  //body
  'create': function ( io, socket, data, callback ) {
    //todo id 会暴露用户量， 如何生成多位随机数
    io.mongo.collection( "imGroup" ).count()
      .then( function ( imGroupId ) {
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
    io.mongo.collection( "imGroup" ).updateOne( data.body, { $push: { numbers: socket.handshake.session.email } } )
      .then( function () {
        return io.mongo.collection( "user" ).updateOne( { email: socket.handshake.session.email } , { $push: { imGroups: data.body.data.body.imGroupId } } )
      } )
      .then( function () {
        //todo 后端只穿部分信息，前端整合，可以节省带宽
        return io.mongo.collection( "imGroup" ).findOne( data.body, { fields: { _id: 0 } } )
      } )
      .then( callback )
  },
  'search': function ( io, socket, data, callback ) {
    // data.body.type ? "im"
    io.mongo.collection( "imGroup" ).find( { gourpId: data.body.imGroupId }, {filed: { _id: 0 , numbers: 0}} )
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
