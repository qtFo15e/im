<template>
  <div id="app" style="width: 1000px;margin: auto;margin-top: 80px">
    <el-dialog
      size="tiny"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      v-model="notlogged">
      <router-view name="dialog">
      </router-view>
    </el-dialog>

    <div v-if="this.$store.state.user.email">
      <el-row>
        <el-col :span="18">
          <el-card class="mainCard" style="width: 700px;height: 515px;">
            <router-view name="main"></router-view>
          </el-card>
        </el-col>
        <el-col :span="6" >
          <el-card class="mainCard" style="width: 300px;height: 515px;position: relative">
            <top style="margin-bottom: 10px"></top>
            <list></list>
            <bottom style="position: absolute;bottom: 0;left: 0"></bottom>
          </el-card>

        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

import list from './components/list.vue'
import top from './components/top.vue'
import bottom from './components/bottom.vue'



export default {
  name: 'app',
  components: {
    list,
    top,
    bottom
  },
  created(){
    var self = this

    this.$http.post( "/api/user/login", {} )
      .then( function ( res ) {
        if ( res.status === 200 ) {
          self.$store.commit( 'initSocket', self )
          self.$store.commit( "initUser" , res.body )

          self.$router.push( "index" )
        }
      } )
      .catch( function ( res ) {
        if ( res.status === 400 ) {
          self.$router.push('login')
        }
      } )

  },
  data(){
  	return {
  		//todo v-model 不能用表达式 Assigning to rvalue
    }
  },
  computed: {
    notlogged(){
    	return !!!this.$store.state.user.email
    }
  }
}
</script>

<style>

html {
  background-color: #999;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#app > div.el-dialog__wrapper > div {
  width: 360px;
  border-radius: 4px;
}
#app > div.el-dialog__wrapper > div > div.el-dialog__header {
  padding: 0;
}
#app > div.el-dialog__wrapper > div > div.el-dialog__body {
  padding-top: 10px;
  padding-bottom: 10px;
}

textarea {
  resize: none;
}

.photo{
  margin-top: 20%;
  margin-left: 20%;
  width: 80%;
  height: 80%;
  border-radius: 50%;
}


.mainCard > div {
  padding: 0;
  height: 100%;
}
</style>
