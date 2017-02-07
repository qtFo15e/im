<template>
  <div>
    <el-row style="color: #2c3e50">
      <el-col :span="8">{{message.username}}</el-col>
      <el-col :span="16">{{ new Date().toLocaleDateString() }}</el-col>
    </el-row>
    <el-row style="color: #006600">
      <el-col :span="24">
          {{message.value}}
      </el-col>
    </el-row>
  </div>

</template>

<script>
  export default {
    props: [ "message" ],
    computed: {

    }
  }
</script>
