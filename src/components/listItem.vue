<template>
    <el-row style="line-height: 1.4;text-align: left;margin: 0;" :gutter="10">
      <el-col :span="6">
        <div @click="toChat"  style="height: 50px;width: 50px">
          <img class="photo" :src="photo">
        </div>
      </el-col>
      <el-col :span="12" style="padding-top: 7px;">
        <el-row >
          <el-col :span="18" >
            <div @click="toChat">{{ name }}</div>
          </el-col>
          <el-col :span="6" style="text-align: center;padding-right:10px">

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="signature" style="min-height: 1px">
            <div @click="toChat" >{{ signature }}</div>
          </el-col>

        </el-row>
      </el-col>
      <el-col :span="6">
        <el-col :span="24" style="text-align: center;margin-top: 15px">
          <el-badge  is-dot v-if="hasNewMessage" style="margin-right: 10px;" />
          <span   class="el-icon-menu" @click="toProfile"></span>
        </el-col>
      </el-col>
    </el-row>
</template>

<script>
  export default {
  	props: [ 'name', 'signature', 'photo', "receiver", 'route','group'],

  	data(){
  		return {
      }
    },
    computed:{
      hasNewMessage(){
        if ( this.group === 'online' ) {
          return this.$store.state.user.contacts[ this.receiver ].hasNewMessage
        } else if ( this.group === 'group' ) {
        	return this.$store.state.user.imGroup[ this.receiver ].hasNewMessage
        } else {
        	return false
        }
      }
    },
    methods:{
      toProfile(){
        this.$store.state.chatting = {
          receiver: this.receiver,
          route: this.route,
          name: this.name
        }
      	if ( this.route === "userMessage" ) {
          this.$router.push( "profile" )
        } else {
          this.$router.push( "imGroupProfile" )
        }
      },
      toChat(){
        if ( this.group !== 'outline' ) {
          this.$store.state.chatting = {
            receiver: this.receiver,
            route: this.route,
            name: this.name
          }

          if ( this.group === 'online' ) {
            this.$store.state.user.contacts[ this.receiver ].hasNewMessage = false
          } else if ( this.group === 'group' ) {
            this.$store.state.user.imGroup[ this.receiver ].hasNewMessage = false
          }


          this.$router.push( "chat" )
        }
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

  .el-badge__content.is-dot {
    margin-top: 8px;
  }
</style>
