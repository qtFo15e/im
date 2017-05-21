/**
 * Created by ThinkPad on 2017/1/20.
 */
const Promise = require( "bluebird" )


module.exports = {
  'create': function ( io, socket, data, callback ) {
    //todo id 会暴露用户量， 如何生成多位随机数
    io.mongo.collection( "imGroup" ).count()
      .then( function ( imGroupId ) {
        imGroupId = '' + imGroupId
        var imGroup = {
          imGroupId: imGroupId,
          name: data.body.name,
          introduction: data.body.introduction,
          numbers: [socket.handshake.session.email ]
        }
        io.mongo.collection( "imGroup" ).insertOne( imGroup )
          .then( function () {
            return io.mongo.collection( "user" ).updateOne( { email: socket.handshake.session.email }, { $push: { imGroup: imGroupId} } )
          } )
          .then( function () {
            callback( imGroup )
          } )
      } )
  },
  'join': function ( io, socket, data, callback ) {
    io.mongo.collection( "imGroup" ).findOne( { imGroupId: data.body.imGroupId,  numbers: socket.handshake.session.email } )
      .then( function ( result ) {
        if ( result ) {
          callback( {
            status: false,
            body: "已经在数组中"
          } )
        } else {
          io.mongo.collection( "imGroup" ).updateOne( { imGroupId: data.body.imGroupId }, { $push: { numbers: socket.handshake.session.email } } )
            .then( function () {
              io.mongo.collection( "user" ).updateOne( { email: socket.handshake.session.email } , { $push: { imGroup: data.body.imGroupId } } )
            } )
            .then( function () {
              socket.join( data.body.imGroupId )
            } )
            .then( function () {
              //todo 后端只穿部分信息，前端整合，可以节省带宽
              return io.mongo.collection( "imGroup" ).findOne( { imGroupId: data.body.imGroupId }, { fields: { _id: 0 } } )
            } )
            .then( function ( doc ) {
              callback( {
                status: true,
                body: doc
              } )
            } )
        }
      } )
  },
  'search': function ( io, socket, data, callback ) {
    let query = {}
    query[ data.body.type ] = data.body.value
    //todo  没有限制查询数量
    io.mongo.collection( "imGroup" ).find( query, {fields: { _id: 0 , numbers: 0 }} ).toArray()
      .then( function ( docs ) {
        callback( docs )
      } )
  },
  'quit': function ( io, socket, data, callback ) {
    //todo  需要对各种数据库操作的返回值有一定认识
    var imGroup =  io.mongo.collection( "imGroup" ).updateOne( { imGroupId: data.body.imGroupId}, { $pull: { numbers: socket.handshake.session.email } } )
    var user = io.mongo.collection( "user" ).updateOne( { email: socket.handshake.session.email }, { $pull: { imGroup: data.body.imGroupId } } )

    Promise.all( [ imGroup, user ] )
      .then( callback )
  }
}
