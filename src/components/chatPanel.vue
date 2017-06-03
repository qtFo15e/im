<template>
    <div>
      <div  style="font-size: 25px;padding-left: 10px;padding-top:10px;width: 100%;text-align: left;font-weight: bold;border-bottom: 1px solid #747474;margin-bottom: 20px;padding-bottom: 5px;height: 30px;background-color: #20a0ff;color: white"
      >{{ this.$store.state.chatting.name }}</div>
      <vue-scrollbar
        style="margin: 0 20px"
        classes="my-scrollbar"
        ref="chatScrollbar">
        <div class="scroll-me" >
          <chat-message
            v-for="item in messageList"
            :message="item">
          </chat-message>
        </div>
      </vue-scrollbar>
      <div style="margin: 20px">
        <div class="newMs el-textarea"><textarea  @keyup.enter="sendMessage" v-model="newMs" placeholder="请输入内容" rows="2" class="el-textarea__inner"></textarea></div>
        <div style="text-align: right;margin-top: 5px">
          <el-upload
            v-if="false"
            :on-success="fileLoaded"
            :before-upload="checkSize"
            action="/api/profile/photoUpload"
            name="photo"
            :multiple="false"
            :show-file-list="tooLarge">
            <el-button size="small" type="primary">发送图片</el-button>
          </el-upload>
          <el-button @click="sendMessage" type="primary">发送</el-button>
        </div>
      </div>
    </div>
</template>
<script>
  import chatMessage from './chatMessage.vue'
  import VueScrollbar from 'vue2-scrollbar';

  export default {
    data() {
    	return {
        newMs: "",
        type: "text",
        tooLarge: false
      }
    },
    computed: {
    	messageList(){
    		var self = this
        self.$nextTick( function () {
          self.$refs.chatScrollbar.scrollToY(9999)
        } )
        if ( this.$store.state.chatting.route === 'userMessage' ){
          return  this.$store.state.chatting.receiver ? this.$store.state.user.contacts[ this.$store.state.chatting.receiver ].messageList: []
        } else {
          return  this.$store.state.chatting.receiver ? this.$store.state.user.imGroup[ this.$store.state.chatting.receiver ].messageList: []
        }
      }
    },
    methods: {
      fileLoaded (res) {
      	var self = this
        if ( self.$store.state.chatting.route === 'userMessage' ){
          self.$store.state.user.contacts[ self.$store.state.chatting.receiver ].messageList.push( {
            value: self.newMs,
            name: self.$store.state.user.profile.name,
            sender: self.$store.state.user.email
          } )
        } else {
          self.$store.state.user.imGroup[ self.$store.state.chatting.receiver ].messageList.push( {
            value: self.newMs,
            name: self.$store.state.user.profile.name,
            sender: self.$store.state.user.email
          } )
        }

        self.newMs = ''
      },
      checkSize (file) {
        this.tooLarge = false
        //500KB
        const maxSize = 500000
        if (file.size > 500000){
          this.tooLarge = true
          return false
        }
        //todo 成功提示 + 触发改变数据
      },


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
          } else {
            self.$store.state.user.imGroup[ self.$store.state.chatting.receiver ].messageList.push( {
              value: self.newMs,
              name: self.$store.state.user.profile.name,
              sender: self.$store.state.user.email
            } )
          }

          self.newMs = ''
        })
      },
    },
    components: {
      chatMessage,
      VueScrollbar
    }
  }
</script>

<style>
  .newMs textarea{
    height: 105px;
    max-height: 105px;
  }

  .my-scrollbar {
    height: 270px;
  }
  /*The Content*/
  .scroll-me {
    margin-right: 15px;
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

  /*todo 参数不好使*/
  .el-upload__files {
    display: none;
  }
</style>
