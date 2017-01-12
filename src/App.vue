<template>
  <div id="app">
    <signup></signup>
    <login></login>
    <profile></profile>
  </div>
</template>

<script>
import signup from './components/signup.vue'
import login from './components/login.vue'
import profile from './components/profile.vue'

export default {
  name: 'app',
  components: {
    signup,
    login,
    profile
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
