<template>
  <div>
    <el-row>
      <el-col :span="24">
        <span style="float: left">Web IM</span>
        <el-button style="float: right;padding: 0"  icon="close" @click="logout" type="text"></el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-button  icon="star-on" size="small" ></el-button>
      <el-button  icon="plus" size="small" @click="find" ></el-button>
      <el-button  icon="document" size="small" @click="profile"></el-button>
      <el-button  icon="setting" size="small" @click="setting"></el-button>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div style="height: 50px;width: 50px">
          <!--'/api/profile/photo/' + this.$store.state.user.email-->
          <img class="photo" :src="this.$store.state.photo" >
        </div>
      </el-col>
      <el-col :span="18" style="text-align: left">
        <div style="font-weight: bold">{{ this.$store.state.user.profile.name }}</div>
        <div >{{ this.$store.state.user.profile.signature }}</div>
      </el-col>
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
        this.$store.replaceState({
          user: {},
          io: null,
          onlineContacts:[],
          chatting: {}
        })
        this.$router.push( 'login' )
      },
      setting(){
  			//todo 消息提示开关等
      }
    }
  }
</script>

<style>
  .photo{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
</style>
