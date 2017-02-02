<template>
    <li >
      <el-row>
        <el-col :span="20" class="el-button el-button--default" style="display: block;border: none;padding: 0">
          <el-row>
            <el-col :span="6">
              <img :src="photo" style="width: 30px;height: 30px">
            </el-col>
            <el-col :span="18">
              <div>{{ name }}</div>
              <div>{{ signature }}</div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4" class="el-button el-button--default" style="display: block;border: none;padding: 0;margin: 0">
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
