<template>
  <div>
    <el-row>
      <el-col :span="12">Web IM</el-col>
      <el-col :span="12"><el-button  icon="close" @click="logout" type="text"></el-button></el-col>
    </el-row>
    <el-row>
      <el-col :span="6"><img :src="'http://localhost:3000/api/user/captcha/init'" ></el-col>
      <el-col :span="18">
        <div style="text-align: right">{{ this.$store.state.user.profile.name }}</div>
        <div style="text-align: left">{{ this.$store.state.user.profile.signature }}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-button  icon="star-on" ></el-button>
      <el-button  icon="plus" @click="find"></el-button>
      <el-button  icon="document" @click="profile"></el-button>
      <el-button  icon="setting" ></el-button>
    </el-row>

  </div>
</template>

<script>
  export default {
  	methods: {
  		find(){
        this.$router.push( "find" )
      },
      profile(){
  			this.$store.state.chatting = {
  				receiver: this.$store.state.user.email
        }
        this.$router.push( "profile" )
      },
  		logout(){
  			this.$store.state.io.disconnected = true
  			this.$store.state.io.connected = false
        this.$router.push( 'login' )
      }
    }
  }
</script>
