<template>
    <div>
      <h3>群组信息</h3>
      <div style="height: 200px">
        <div v-if="showNumbers">
          <el-row :gutter="20">
            <el-col v-for="item in info.numbers" :span="12">
              <el-row>
                <el-col :span="8">
                  <div style="height: 50px;width: 50px">
                    <img class="photo" src="'http://localhost:3000/api/user/captcha/init'">
                  </div>
                </el-col>
                <el-col :span="16">{{ item.name }}</el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div v-else="showNumbers">
          <el-row :gutter="20" class="myList">
            <el-col :span="6" class="listName">群组名</el-col>
            <el-col :span="12" class="listValue">{{info.name}}</el-col>
          </el-row>
          <el-row :gutter="20" class="myList">
            <el-col :span="6" class="listName">群组号</el-col>
            <el-col :span="12" class="listValue">{{info.imGroupId}}</el-col>
          </el-row>
          <el-row :gutter="20" class="myList">
            <el-col :span="6" class="listName">简介</el-col>
            <el-col :span="12" class="listValue">{{info.introduction}}</el-col>
          </el-row>
          <el-row :gutter="20" class="myList">
            <el-col :span="6" class="listName">成员数</el-col>
            <el-col :span="12" class="listValue">{{ info.numbers.length }}</el-col>
          </el-row>
        </div>
      </div>
      <el-row :gutter="20" class="myList">
        <el-col :span="12">
        <span>
          <el-switch
            v-model="showNumbers"
            on-text=""
            off-text="">
          </el-switch>
          成员信息
        </span>
        </el-col>
        <el-col :span="12">
          <el-button type="danger" icon="delete" @click="quit">退出群组</el-button>
        </el-col>
      </el-row>
    </div>
</template>
<script>
  var _ = require( 'underscore' )

  export default {
    data(){
      return {
        showNumbers: false
      }
    },
    computed: {
      info(){
        return Object.assign( {}, _.omit( this.$store.state.user.imGroup[ this.$store.state.chatting.receiver ], 'messageList' ), { imGroupId: this.$store.state.chatting.receiver } )
      }
    },
    methods: {
      quit() {
      	var self = this

        this.$store.state.io.emit('message', {
          route: 'imGroupRelation',
          event: 'quit',
          body: {
      			imGroupId: self.info.imGroupId
          }
        }, function () {

        })
      }
    }
  }
</script>
