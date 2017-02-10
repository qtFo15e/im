<template>
  <div id="app" style="width: 960px;margin: auto;margin-top: 200px">
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
        <el-col :span="16">
          <el-card style="width: 600px;height: 550px">
            <router-view name="main"></router-view>
          </el-card>

        </el-col>
        <el-col :span="8">
          <top style="margin-bottom: 20px"></top>
          <list></list>
        </el-col>
      </el-row>
    </div>
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
import top from './components/top.vue'
import index from  './components/index.vue'

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
    imGroupProfile,
    top,
    index
  },
  created(){
    var self = this

    this.$http.post( "/api/user/login", {} )
      .then( function ( res ) {
        if ( res.status === 200 ) {
          self.$store.commit( 'initSocket', self )
          self.$store.commit( "initUser" , res.body )

          self.$router.push( "index" )
        } else if ( res.status === 400 ) {
          self.notlogged = true
          this.$router.push('login')
        }
      } )


    if ( this.nologged ) {
    	//todo  有bug 再返回时对话框还在

    }
  },
  data(){
  	return {
  		//todo v-model 不能用表达式 Assigning to rvalue
  		notlogged: false
    }
  },
  computed: {
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
</style>
