/**
 * Created by ThinkPad on 2017/2/3.
 */

module.exports = {
  userLogin( state, res, vm ){
    state.onlineContacts.push( res.body.email )
  },
  userLogout( state, res, vm ) {
    console.log( "out" )
    console.log( res )
    console.log( state.onlineContacts )
    state.onlineContacts.splice( state.onlineContacts.indexOf( res.body.email ), 1 )
    console.log( state.onlineContacts )
  }
}
