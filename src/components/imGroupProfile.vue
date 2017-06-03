<template>
    <div style="height: 100%;position: relative">
      <h3>群组信息</h3>
      <div style="position: relative" >
        <div v-if="showNumbers">
          <el-row :gutter="20">
            <el-col v-for="item in info.numbers" :span="12">
              <el-row style="padding-left: 50px">
                <el-col :span="6" style="">
                  <div style="height: 50px;width: 50px;text-align: right">
                    <img class="photo" :src="'/api/profile/photo/' + item">
                  </div>
                </el-col>
                <el-col  style="margin-top: 20px" :span="16">{{ item }}</el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div v-else="showNumbers">
          <el-row :gutter="20" class="myList" style="height: 50px">
            <el-col :span="6" class="listName" style="height: 100%;"><div style="position: relative;bottom: -32px">头像</div></el-col>
            <el-col :span="12" class="listValue">
              <div style="height: 50px;width: 50px">
                <img class="photo" :src="'/api/profile/photo/group'">
              </div>
            </el-col>
          </el-row>
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
      <el-row :gutter="20" class="myList" style="margin-top: 30px;position: absolute;bottom: 50px;width: 100%">
        <el-col :span="12" style="margin-top: 10px;">
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

        self.$confirm('确定删除好友？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then( function () {
          self.$store.state.io.emit('message', {
            route: 'imGroupRelation',
            event: 'quit',
            body: {
              imGroupId: self.info.imGroupId
            }
          }, function () {
            self.$notify({
              title: '提示',
              message: "退出群组成功",
              type: "success"
            });
            self.$store.commit( "quitImGroup", self.info.imGroupId )
            self.$router.push( 'index' )
          })
        })


      }
    }
  }
</script>
