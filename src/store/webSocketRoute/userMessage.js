/**
 * Created by ThinkPad on 2017/2/7.
 */

const _ = require( 'underscore' )

module.exports = {
  text( state, res, vm ){
    res.body.name = state.user.contacts[ res.body.sender ].profile.name
    state.user.contacts[ res.body.sender ].messageList.push( res.body )
    state.user.contacts[ res.body.sender ].hasNewMessage = true
  },
  file( state, res, vm ){

  }
}
