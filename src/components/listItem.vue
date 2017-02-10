<template>
    <el-row style="line-height: 1.4;text-align: left" :gutter="10">
      <el-col :span="6">
        <img :src="photo" style="width: 100%;height:100%">
      </el-col>
      <el-col :span="18" >
        <el-row>
          <el-col :span="18" >
            <div @click="toChat">{{ name }}</div>
          </el-col>
          <el-col :span="6">
            <el-badge is-dot />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18" >
            <div>{{ signature }}</div>
          </el-col>
          <el-col :span="6">
            <span  class="el-icon-menu" ></span>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
</template>

<script>
  export default {
  	props: [ 'name', 'signature', 'photo'],

  	data(){
  		return {

      }
    },
    methods:{
      toChat(){
      	this.$router.push( 'chat' )
      }
    }
  }
</script>

<style>

</style>
