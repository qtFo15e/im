<template>
    <el-row style="margin: 10px;height: 50px">
      <el-col :span="18" class="el-button el-button--default" style="display: block;border: none;padding: 0">
        <el-row>
          <el-col :span="6">
            <img :src="photo" style="width: 30px;height: 30px">
          </el-col>
          <el-col :span="18" >
            <div @click="toChat" style="background-color: #008800">{{ name }}</div>
            <div>{{ signature }}</div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4" class="el-button el-button--default" style="display: block;border: none;padding: 0;margin: 0">
        <el-row>
          <el-col :span="24" style="height: 15px">
            <el-badge is-dot />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <span  class="el-icon-menu" style="font-size: 15px"></span>
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
