// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

/* eslint-disable no-new */
import Vue from './vue'
import App from './App';
import store from './store/index'

new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
