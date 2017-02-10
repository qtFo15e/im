<template>
    <el-row style="line-height: 1.4;text-align: left;margin: 0" :gutter="10">
      <el-col :span="6">
        <img :src="photo" style="width: 100%;height:100%">
      </el-col>
      <el-col :span="18" @click="selectChatting" >
        <el-row @click="toChat">
          <el-col :span="18" >
            <div >{{ name }}</div>
          </el-col>
          <el-col :span="6">
            <el-badge is-dot v-if="hasNewMessage" />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18" class="signature" @click="toChat" >
            {{ signature }}
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
  	props: [ 'name', 'signature', 'photo', 'toProfile', "hasNewMessage"],

  	data(){
  		return {

      }
    },
    methods:{
      toChat(){
//      	this.$router.push( 'chat' )
        alert("chat")
      },
      selectChatting(){
      	alert("slect")
      }
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
