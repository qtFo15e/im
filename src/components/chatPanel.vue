<template>
    <el-card>
      <div style="height: 300px;overflow-y: auto">
        <chat-message
          v-for="item in messageList"
          :message="item">
        </chat-message>
        {{ test }}
      </div>
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        v-model="newMs">
      </el-input>
      <el-button @click="sendMessage">发送</el-button>
    </el-card>
</template>
<script>
  import chatMessage from './chatMessage.vue'

  export default {
    data() {
    	return {
        newMs: "",
        messageList:[]
      }
    },
    computed: {
    	test(){
    		var self = this

//        self.$store.state.io.
      }
    },
    methods: {
      sendMessage(){
      	var self = this

//        self.$store.state.io.send(  )
      }
    },
    components: {
      chatMessage
    }
  }
</script>
