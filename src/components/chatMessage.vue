<template>
  <div>
    <el-row >
      <el-col :span="24" style="text-align: left" v-bind:style="{color: message.sender === '_self' ? '#000000': '#530466'}">
        {{message.name}} {{ date.toLocaleDateString() }} {{ date.toLocaleTimeString() }}
      </el-col>
    </el-row>
    <el-row >
      <el-col :span="24"  style="text-align: left">{{message.value}}</el-col>
    </el-row>
  </div>

</template>

<script>
  export default {
    props: [ "message" ],
    data(){
    	return {
    		date: new Date()
      }
    },
    computed: {

    }
  }
</script>
