<template>
    <el-card style="width: 600px">
      <vue-scrollbar
        classes="my-scrollbar"
        ref="Scrollbar">
        <div class="scroll-me" >
          <chat-message
            v-for="item in messageList"
            :message="item">
          </chat-message>
        </div>
      </vue-scrollbar>

      <div style="margin-top: 20px">
        <el-input
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="newMs">
        </el-input>
      </div>
      <div>
        <el-button @click="init">init</el-button>
        <el-button @click="group">group</el-button>
        <el-button @click="close">关闭</el-button>
        <el-button @click="sendMessage" type="primary">发送</el-button>
      </div>
    </el-card>
</template>
<script>
  import chatMessage from './chatMessage.vue'
  import VueScrollbar from 'vue2-scrollbar';

  //todo 加载样式文件？？？？ 需要使用绝对路径？
//  require("vue2-scrollbar/style/vue2-scrollbar.css")

  export default {
    data() {
    	return {
        newMs: "",
        type: "text",
      }
    },
    computed: {
    	messageList(){
    		var self = this
        self.$nextTick( function () {
          self.$refs.Scrollbar.scrollToY(9999)
        } )
        if ( this.$store.state.chatting.route === 'userMessage' ){
          return  this.$store.state.chatting.receiver ? this.$store.state.user.contacts[ this.$store.state.chatting.receiver ].messageList: []
        } else {
          return  this.$store.state.chatting.receiver ? this.$store.state.user.imGroup[ this.$store.state.chatting.receiver ].messageList: []
        }


      }
    },
    methods: {
      sendMessage(){
      	var self = this

        if ( this.newMs === "" ) return

        this.$store.state.io.emit( "message", {
        	route: self.$store.state.chatting.route,
          event: self.type,
          body: {
            receiver: self.$store.state.chatting.receiver,
            value: self.newMs
          }
        } , function () {
          if ( self.$store.state.chatting.route === 'userMessage' ){
            self.$store.state.user.contacts[ self.$store.state.chatting.receiver ].messageList.push( {
              value: self.newMs,
              name: self.$store.state.user.profile.name,
              sender: self.$store.state.user.email
            } )
          }

          self.newMs = ''
        })
      },
      init(){
        this.$store.state.chatting = this.$store.state.user.email === 'chi@qq.com'  ? { route:"userMessage", receiver: "123@qq.com" } : { route:"userMessage", receiver: "chi@qq.com" }
      },
      group(){
        this.$store.state.chatting = { route:"imGroupMessage", receiver: "1" }
      },
      close(){

      }
    },
    watch: {
      messageList(){
      	var self = this

      }
    },
    components: {
      chatMessage,
      VueScrollbar
    }
  }
</script>

<style>
  .my-scrollbar {
    height: 100px;
  }
  /*The Content*/
  .scroll-me {
  }
  .vue-scrollbar-transition, .vue-scrollbar__scrollbar-vertical, .vue-scrollbar__scrollbar-horizontal {
    transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -webkit-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
  }
  .vue-scrollbar-transition--scrollbar {
    transition: opacity 0.5s linear;
    -moz-transition: opacity 0.5s linear;
    -webkit-transition: opacity 0.5s linear;
    -o-transition: opacity 0.5s linear;
  }

  .vue-scrollbar__wrapper {
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    background: white;
  }
  .vue-scrollbar__wrapper:hover .vue-scrollbar__scrollbar-vertical, .vue-scrollbar__wrapper:hover .vue-scrollbar__scrollbar-horizontal {
    opacity: 1;
  }
  .vue-scrollbar__scrollbar-vertical, .vue-scrollbar__scrollbar-horizontal {
    opacity: 0.5;
    position: absolute;
    background: transparent;
  }
  .vue-scrollbar__scrollbar-vertical:hover, .vue-scrollbar__scrollbar-horizontal:hover {
    background: rgba(0, 0, 0, 0.3);
  }
  .vue-scrollbar__scrollbar-vertical .scrollbar, .vue-scrollbar__scrollbar-horizontal .scrollbar {
    position: relative;
    background: rgba(0, 0, 0, 0.5);
    cursor: default;
  }
  .vue-scrollbar__scrollbar-vertical {
    width: 10px;
    height: 100%;
    top: 0;
    right: 0;
  }
  .vue-scrollbar__scrollbar-vertical .scrollbar {
    width: 10px;
  }
  .vue-scrollbar__scrollbar-horizontal {
    height: 10px;
    width: 100%;
    bottom: 0;
    right: 0;
  }
  .vue-scrollbar__scrollbar-horizontal .scrollbar {
    height: 10px;
  }

</style>
