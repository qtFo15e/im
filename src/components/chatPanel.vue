<template>
    <el-card>
      <div>dasdadsa</div>
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        v-model="sub">
      </el-input>
      <el-button>发送</el-button>
    </el-card>
</template>
<script>
  export default {
    data() {
    	return {
    		sub: "",
        pub: ""
      }
    },
    methods: {

    }
  }
</script>
