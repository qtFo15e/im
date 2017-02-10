/**
 * Created by ThinkPad on 2017/2/8.
 */

import VueRouter from 'vue-router';

import login from './components/login.vue'
import signup from './components/signup.vue'
import profile from './components/profile.vue'
import profileEdit from './components/profileEdit.vue'
import photo from  './components/photo.vue'
import chatPanel from './components/chatPanel.vue'
import list from './components/list.vue'
import find from './components/find.vue'
import imGroupProfile from './components/imGroupProfile.vue'
import top from './components/top.vue'
import index from  './components/index.vue'

const router = new VueRouter({
  routes: [
    {
      path: "/login",
      components: {
        dialog: login
      }
    },
    {
      path: "/signup",
      components: {
        dialog: signup
      }
    },
    {
      path: "/index",
      components: {
        main: index
      }
    },
    {
      path: "/profile",
      components: {
        main: profile
      }
    },
    {
      path: "/editProfile",
      components: {
        main: profileEdit
      }
    },
    {
      path: "/chat",
      components: {
        main: chatPanel
      }
    },
    {
      path: "/find",
      components: {
        main: find
      }
    }
  ],
});

export default router


