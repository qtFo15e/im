/**
 * Created by ThinkPad on 2017/1/15.
 */

import vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from  './mutations'


const state = {
  strict: true,

  email: "",
  sex: "",
  age: "",
  birthday: "",
  signature: "",
  province: "",
  city:'',
  name:''

}

export default new vuex.Store( {
  state,
  getters,
  actions,
  mutations,
} )
