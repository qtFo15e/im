/**
 * Created by ThinkPad on 2017/1/15.
 */

import vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from  './mutations'


const state = {
  user: {},
  io: null,
  onlineContacts:[],
  chatting: ""
}

export default new vuex.Store( {
  //todo 遗留问题， 未开启严格模式
  // strict: true,
  state,
  // getters,
  actions,
  mutations,
} )
