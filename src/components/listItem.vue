<template>
    <li class="el-button el-button--default" style="display: block;border: none;padding: 0">
      <el-row>
        <el-col :span="4" >
          <img :src="photo">
        </el-col>
        <el-col :span="16">
          <div>{{ name }}</div>
          <div>{{ signature }}</div>
        </el-col>
        <el-col :span="4">
          <span  class="el-icon-menu" style="font-size: 20px"></span>
        </el-col>
      </el-row>
    </li>

</template>

<script>
  export default {
  	props: [ 'name', 'signature', 'photo'],

  	data(){
  		return {

      }
    }
  }
</script>

<style>

</style>
