/**
 * Created by ThinkPad on 2017/2/7.
 */

const _ = require( 'underscore' )

module.exports = {
  text( state, res ){
    res.body.name = state.user.contacts[ res.body.sender ].profile.name
    state.user.contacts[ res.body.sender ].messageList.push( res.body )
    if ( state.chatting.receiver !== res.body.sender ) {
      state.user.contacts[ res.body.sender ].hasNewMessage = true
    }
    if ( state.sound ) {
      document.getElementById( "tipSound" ).play()
    }
  },
  file( state, res, vm ){

  }
}
