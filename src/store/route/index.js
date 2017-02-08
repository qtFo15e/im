/**
 * Created by ThinkPad on 2017/2/3.
 */

var userStatus = require( "./userStatus" )
var userMessage = require( './userMessage' )

let app = {
  userStatus,
  userMessage
}


module.exports = {
  login( state, vm ){
    state.io.emit( "message", {
      route: 'userStatus',
      event: 'login'
    }, function ( onlineContacts ) {
      state.onlineContacts = onlineContacts
      //！！！数组非变异方法完全不会触发变化，因为检测数组根本没变。重塑方法但触发变化，但不是立即变化，需要手动触发
      vm.$forceUpdate()
    } )

    state.io.on( "message", function ( res ) {
      app[ res.route ][ res.event ]( state, res, vm )
    } )
  },
}
