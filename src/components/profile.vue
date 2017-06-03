<template>
<div style="position: relative;height: 100%">
  <h3>详细信息</h3>
  <el-row :gutter="20" class="myList" style="height: 50px">
    <el-col :span="6" class="listName" style="height: 100%;"><div style="position: relative;bottom: -32px">头像</div></el-col>
    <el-col :span="12" class="listValue">
      <div style="height: 50px;width: 50px">
        <img class="photo" :src="this.$store.state.photo">
      </div>
    </el-col>
  </el-row>
  <el-row :gutter="20" class="myList">
    <el-col :span="6" class="listName">用户名</el-col>
    <el-col :span="12" class="listValue">{{ info.name }}</el-col>
  </el-row>
  <el-row :gutter="20" class="myList">
    <el-col :span="6" class="listName">邮箱</el-col>
    <el-col :span="12" class="listValue">{{ info.email }}</el-col>
  </el-row>
  <el-row :gutter="20" class="myList">
    <el-col :span="6" class="listName">个人</el-col>
    <el-col :span="12" class="listValue">{{ info.sex }}  <span style="height: 1px;width: 1px;margin: 0 5px"></span> {{ info.birthday }}(公历生日) </el-col>
  </el-row>
  <el-row :gutter="20" class="myList">
    <el-col :span="6" class="listName">地区</el-col>
    <el-col :span="12" class="listValue">{{ info.province }} <span style="height: 1px;width: 1px;margin: 0 5px"></span> {{ info.city }} </el-col>
  </el-row>
  <el-row :gutter="20" class="myList">
    <el-col :span="6" class="listName">签名</el-col>
    <el-col :span="12" class="listValue">{{ info.signature }}</el-col>
  </el-row>
  <el-row style="position: absolute;bottom: 50px;width: 100%">
    <el-col :span="23" style="text-align: right;margin-top: 50px">
      <el-button v-if="info.receiver === 'self'" type="info" icon="edit" @click="toEditProfile">修改个人信息</el-button>
      <el-button v-else="" type="danger" icon="delete" @click="deleteContacts" >删除好友</el-button>
    </el-col>
  </el-row>
</div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    computed: {
    	count() {
    		return this.$store.state.count
      },
      info(){
    		if( this.$store.state.chatting.receiver === this.$store.state.user.email ) {
          return Object.assign( {}, this.$store.state.user.profile, { email: this.$store.state.user.email, receiver: "self" } )
        } else {
          return Object.assign( {}, this.$store.state.user.contacts[ this.$store.state.chatting.receiver ].profile , { email: this.$store.state.chatting.receiver } )
        }
      }
    },
    methods: {
      toEditProfile(){
      	this.$router.push( "editProfile" )
      },
      deleteContacts(){
        var self = this

        self.$confirm('确定删除好友？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then( function () {
          self.$store.state.io.emit( "message", {
            route: "userRelation",
            event: 'delete',
            body: {
              email: self.info.email
            }
          } , function () {
            self.$store.commit( "deleteContacts", self.info.email )

            self.$notify({
              title: '提示',
              message: "删除好友成功",
              type: "success"
            });
            self.$router.push( 'index' )
          })
        } ).catch( function () {

        } )

      }
    }
  }
</script>

<style>
  .myList {
    margin-top: 20px;
  }
  .listName {
    text-align: right;
  }
  .listValue {
    text-align: left;
  }
</style>
