/**
 * Created by ThinkPad on 2017/2/8.
 */

module.exports = {
  text( state, res, vm  ){
    var user = state.user.contacts[ res.body.sender ] || state.user
    res.body.name = user.profile.name
    state.user.imGroup[ res.body.receiver ].messageList.push( res.body )
    state.user.imGroup[ res.body.receiver ].hasNewMessage = true
  }
}
