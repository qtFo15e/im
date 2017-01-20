<template>
  <li>
    <el-row>
      <el-col :span="3" >
        <img :src="photo">
      </el-col>
      <el-col :span="16">
        <div>{{ info.name }} ({{info.id}})</div>
        <div>{{ info.introduction }}</div>
      </el-col>
      <el-col :span="5">
        <el-button  @click="joinOrAdd" type="primary" icon="plus"></el-button>
      </el-col>
    </el-row>
  </li>
</template>

<script>
  export default {
    props: [ 'info','photo', "joinOrAdd"],
  }
</script>
