<template>
  <div>
    <el-row>
      <el-col :span="12" style="">
        <span style="float: left;font-style: italic;font-size: 20px;color: #8492a6; border-bottom: 1px solid #5e5e5e">Web IM</span>
        <!--<el-button style="float: right;padding: 0"  icon="close" @click="logout" type="text"></el-button>-->
      </el-col>
    </el-row>

    <el-row style="margin-top: 10px">
      <el-col :span="6">
        <div style="height: 50px;width: 50px">
          <img class="photo" :src="this.$store.state.photo" >
        </div>
      </el-col>
      <el-col :span="18" style="text-align: left;padding-top: 7px">
        <div style="font-weight: bold">{{ this.$store.state.user.profile.name }}</div>
        <div class="signature">{{ this.$store.state.user.profile.signature }}</div>
      </el-col>
    </el-row>
    <el-row class="buttonList" style="margin-top: 10px">
      <el-button  icon="star-on" size="small" @click="toIndex"></el-button>
      <el-button  icon="plus" size="small" @click="find" ></el-button>
      <el-button  icon="document" size="small" @click="profile"></el-button>
      <el-button  icon="close" size="small" @click="logout"></el-button>
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
      	//todo 触发disconnect事件
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
      toIndex(){
        this.$router.push( 'index' )
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
  .buttonList .el-button+.el-button {
    margin-left: 12px;
  }
</style>
