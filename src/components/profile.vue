<template>
<el-card style="width: 500px">
  <h3>详细信息</h3>
  <el-row :gutter="20" class="myList">
    <el-col :span="6" class="listName">头像</el-col>
    <el-col :span="12" class="listValue"><img src="http://localhost:3000/api/user/captcha/init"></el-col>
  </el-row>
  <el-row :gutter="20" class="myList">
    <el-col :span="6" class="listName">用户名</el-col>
    <el-col :span="12" class="listValue">{{ name }}</el-col>
  </el-row>
  <el-row :gutter="20" class="myList">
    <el-col :span="6" class="listName">邮箱</el-col>
    <el-col :span="12" class="listValue">{{ email }}</el-col>
  </el-row>
  <el-row :gutter="20" class="myList">
    <el-col :span="6" class="listName">个人</el-col>
    <el-col :span="12" class="listValue">{{ sex }} {{ birthday }} </el-col>
  </el-row>
  <el-row :gutter="20" class="myList">
    <el-col :span="6" class="listName">地区</el-col>
    <el-col :span="12" class="listValue">{{ province }} {{ city }} </el-col>
  </el-row>
  <el-row :gutter="20" class="myList">
    <el-col :span="6" class="listName">签名</el-col>
    <el-col :span="12" class="listValue">{{ signature }}</el-col>
  </el-row>

  <el-button type="info" icon="edit">修改个人信息</el-button>
  <el-button type="danger" icon="delete">删除好友</el-button>
</el-card>
</template>

<script>
  export default {
    data() {
      return {
        email: "chimeng@qq.com",
        name: "我吃吃",
        sex: '男',
        birthday:'2018年10月5日',
        province: "吉林",
        city: '长春',
        signature: '我走过最长的路就是你套路'
      }
    },
    props: [  ],
    computed: {
    	count() {
    		return this.$store.state.count
      }
    },
    methods: {
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
