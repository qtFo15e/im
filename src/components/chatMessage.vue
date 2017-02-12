<template>
  <div style="overflow: hidden">
    <div style="border-radius: 5px;background-color: #58B7FF;float: left;text-align: left;padding: 3px 5px;margin-bottom: 10px"
      v-bind:style="{float: message.sender === selfEmail ? 'left': 'right'}">
      <div> {{message.name}} 丨 {{ date }} </div>
      <div> {{message.value}} </div>
    </div>
  </div>


</template>

<script>
  var moment = require( 'moment' )

  export default {
    props: [ "message" ],
    data(){
    	return {
    		date: moment().format('YYYY-MM-DD HH:mm:ss')
      }
    },
    computed: {
      selfEmail(){
      	return this.$store.state.user.email
      }
    }
  }
</script>
