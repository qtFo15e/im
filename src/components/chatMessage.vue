<template>
  <div style="overflow: hidden">
    <div style="border-radius: 5px;background-color: #58B7FF;float: left;text-align: left;padding: 3px 5px;margin-bottom: 10px"
      v-bind:style="{float: message.sender === selfEmail ? 'left': 'right'}">
      <div> {{message.name}} {{ date.toLocaleDateString() }} {{ date.toLocaleTimeString() }} </div>
      <div> {{message.value}} </div>
    </div>
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
