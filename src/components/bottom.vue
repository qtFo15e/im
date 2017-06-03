<template>
  <el-row class="buttonList" style="margin-top: 10px;background-color: #cecece;width: 100%" >
    <el-button type="text" style="width: 18%;margin-left: 0"  @click="toIndex"><i class=" fa fa-lg fa-home" aria-hidden="true"></i></el-button>
    <el-button type="text" style="width: 18%;margin-left: 0"  @click="find"><i class=" fa fa-lg fa-user-plus" aria-hidden="true"></i></el-button>
    <el-button type="text" style="width: 18%;margin-left: 0"  @click="profile"><i class=" fa fa-lg fa-id-card" aria-hidden="true"></i></el-button>
    <el-button v-if="this.$store.state.sound" type="text" style="width: 18%;margin-left: 0"  @click="sound"><i class="    fa fa-lg fa-volume-up" aria-hidden="true"></i></el-button>
    <el-button v-else type="text" style="width: 18%;margin-left: 0"  @click="sound"><i class="    fa fa-lg fa-volume-off" aria-hidden="true"></i></el-button>
    <el-button type="text" style="width: 18%;margin-left: 0"  @click="weather"><i class="  fa fa-lg fa-sun-o" aria-hidden="true" ></i></el-button>
  </el-row>
</template>
<script>


  export default {

    computed: {

    },
    components: {

    },
    methods: {
      weather(){
        this.$router.push( "weather" )
      },
      find(){
        this.$router.push( "find" )
      },
      profile(){
        this.$store.state.chatting = {
          receiver: this.$store.state.user.email
        }
        this.$router.push( "profile" )
      },

      toIndex(){
        this.$router.push( 'index' )
      },
      sound(){
        this.$store.state.sound = !this.$store.state.sound
      }
    }
  }
</script>

<style>

  .buttonList .el-button+.el-button {
    margin-left: 12px;
  }
</style>
