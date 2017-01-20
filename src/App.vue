<template>
  <div id="app">
    <find></find>
    <list></list>
    <chat-panel></chat-panel>
    <signup></signup>
    <login></login>
    <profile></profile>
    <photo></photo>
    <profile-edit></profile-edit>

  </div>
</template>

<script>
import signup from './components/signup.vue'
import login from './components/login.vue'
import profile from './components/profile.vue'
import profileEdit from './components/profileEdit.vue'
import photo from  './components/photo.vue'
import chatPanel from './components/chatPanel.vue'
import list from './components/list.vue'
import find from './components/find.vue'

export default {
  name: 'app',
  components: {
    signup,
    login,
    profile,
    photo,
    profileEdit,
    chatPanel,
    list,
    find
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
