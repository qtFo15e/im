<template>
  <div style="background: #c8c8c8;padding-top: 5px;padding-bottom: 5px">
    <el-row>
      <el-col :span="24" style="">
        <span style="float: left;font-weight: bold;font-size: 20px;color: #8492a6;margin-left: 10px ">Web IM</span>
        <!--<el-button style="float: right;padding: 0"  icon="close" @click="logout" type="text"></el-button>-->
        <el-button style="float: right;margin-right: 10px" icon="close" size="small" type="text" @click="logout"></el-button>
      </el-col>
    </el-row>

    <el-row style="margin-top: 10px">
      <el-col :span="6">
        <div style="height: 50px;width: 50px">
          <img  id="myPhoto" class="photo" :src="this.$store.state.photo" >
        </div>
      </el-col>
      <el-col :span="18" style="text-align: left;padding-top: 7px">
        <div style="font-weight: bold">{{ this.$store.state.user.profile.name }}</div>
        <div class="signature">{{ this.$store.state.user.profile.signature }}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
  	methods: {

  		logout(){
      	var  self = this

        this.$store.state.io.emit( "message", {
          route: "userStatus",
          event: "logout",
          body: {

          }
        }, function () {
          //todo 触发disconnect事件
//          this.$store.state.io.disconnected = true
//          this.$store.state.io.connected = false
        })

        self.$http.get("/api/user/logout" )
          .then( function ( res ) {
            self.$store.replaceState({
              user: {},
              io: null,
              onlineContacts:[],
              chatting: {}
            })
            self.$router.push( 'login' )
          } )
      },

    }
  }
</script>

<style>

</style>
