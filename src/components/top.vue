<template>
  <div>
    <div>
      <h1>Web IM</h1>
    </div>
    <div style="font-weight: bold;color: #5e95b6">
      <img :src="'http://localhost:3000/api/user/captcha/init'" >
      {{ this.$store.state.user.profile.name }}</div>
    <el-button  icon="plus" @click="find"></el-button>
    <el-button  icon="edit" @click="editProfile"></el-button>
    <el-button  icon="document" @click="profile"></el-button>
    <el-button  icon="close" @click="logout" ></el-button>
  </div>
</template>

<script>
  export default {
  	methods: {
  		find(){
        this.$router.push( "find" )
      },
      profile(){
        this.$router.push( "profile" )
      },
      editProfile(){
        this.$router.push( 'editProfile' )
      },
  		logout(){
  			this.$store.state.io.disconnected = true
  			this.$store.state.io.connected = false
        this.$router.push( '' )
      }
    }
  }
</script>
