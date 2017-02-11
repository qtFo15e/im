<template>
    <el-row style="line-height: 1.4;text-align: left;margin: 0" :gutter="10">
      <el-col :span="6">
        <div style="height: 50px;width: 50px">
          <img class="photo" src="'http://localhost:3000/api/user/captcha/init'">
        </div>
      </el-col>
      <el-col :span="18">
        <el-row >
          <el-col :span="18" >
            <div @click="toChat">{{ name }}</div>
          </el-col>
          <el-col :span="6">
            <el-badge is-dot v-if="hasNewMessage" />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18" class="signature" >
            <div @click="toChat" >{{ signature }}</div>
          </el-col>
          <el-col :span="6" style="text-align: center">
            <span  class="el-icon-menu" @click="toProfile"></span>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
</template>

<script>
  export default {
  	props: [ 'name', 'signature', 'photo', "hasNewMessage", "receiver", 'route'],

  	data(){
  		return {

      }
    },
    methods:{
      toProfile(){
        this.$store.state.chatting = {
          receiver: this.receiver,
          route: this.route
        }
      	if ( this.route === "userMessage" ) {
          this.$router.push( "profile" )
        } else {
          this.$router.push( "imGroupProfile" )
        }
      },
      toChat(){
//      	this.$router.push( 'chat' )
        alert("chat")
      },
    }
  }
</script>

<style>
.signature {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
