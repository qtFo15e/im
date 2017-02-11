/**
 * Created by ThinkPad on 2017/1/15.
 */

const _ = require( "underscore" )
const app = require( './webSocketRoute/index' )

export default {
  initUser(state, rowUserData) {
    rowUserData.contacts = convertContacts( rowUserData.contacts )
    rowUserData.imGroup = convertImGroup( rowUserData.imGroup )
    state.user = rowUserData
    state.photo = '/api/profile/photo/' + rowUserData.email
  },
  initSocket( state, vm ){
    state.io = io()
    app.login( state ,vm )
  },

  addContacts( state, contacts ){
    var temp = {}
    temp[ contacts.email ] = {
      profile: contacts.profile,
      messageList: [],
    }
    state.user.contacts = Object.assign( {}, state.user.contacts, temp )
  },
  addImGroup( state, imGroup ){
    var temp = {}
    temp[ imGroup.imGroupId ]  = _.omit( imGroup, 'imGroupId' )
    temp[ imGroup.imGroupId ].messageList = []
    state.user.imGroup = Object.assign( {}, state.user.imGroup, temp )
  },
  deleteContacts( state, email ) {
    state.user.contacts = _.omit( state.user.contacts, email )
  },
  quitImGroup( state,imGroupId  ) {
    state.user.imGroup = _.omit( state.user.imGroup, imGroupId )
  }
}

function convertContacts( contacts ) {
  var result = {}
  _.each( contacts, function ( item ) {
    result[ item.email ] = {
      profile: item.profile,
      messageList: []
    }
  } )
  return result
}

function convertImGroup ( imGroup ) {
  var result = {}
  _.each( imGroup, function ( item ) {
    result[ item.imGroupId ] = {
      name: item.name,
      introduction: item.introduction,
      numbers: item.numbers,
      messageList: []
    }
  } )
  return result
}

