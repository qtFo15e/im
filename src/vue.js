/**
 * Created by ThinkPad on 2017/1/3.
 */

import Vue from 'vue'
import 'element-ui/lib/theme-default/index.css'
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import vueRouter from 'vue-router';
import ElementUI from 'element-ui';
import locale from './config/element.lang.conf'

Vue.config.debug = true

Vue.use( ElementUI, { locale } )
Vue.use(Vuex);
Vue.use(VueResource);
Vue.use(vueRouter);


export default Vue
