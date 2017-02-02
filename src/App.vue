<template>
  <div id="app">
    <login></login>
    <!--<div v-if="this.$store.state.user.imGroup">-->
      <!--<im-group-profile :info="this.$store.state.user.imGroup[0]"></im-group-profile>-->
    <!--</div>-->
    <find></find>
    <list></list>

    <signup></signup>

    <profile></profile>
    <photo></photo>
    <profile-edit></profile-edit>
    <chat-panel></chat-panel>

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
import imGroupProfile from './components/imGroupProfile.vue'

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
    find,
    imGroupProfile
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
