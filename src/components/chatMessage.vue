<template>
  <div>
    <el-row >
      <el-col :span="24" style="text-align: left" v-bind:style="{color: message.sender === selfEmail ? '#000000': '#B32F98'}">
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
      selfEmail(){
      	return this.$store.state.user.email
      }
    }
  }
</script>
