<template>
<div >
  <!--&lt;!&ndash;todo v-for 中建立索引&ndash;&gt;-->
  <el-menu theme="dark"   mode="vertical" >
    <el-submenu index="online">
      <h4 slot="title">在线</h4>
      <el-menu-item
        v-for="(item,key) in this.$store.state.user.contacts"
        v-if="inOnlineContacts( key )"
        :index="key"
        style="padding: 0"
        >
        <list-item
          :hasNewMessage="item.hasNewMessage"
          :toProfile="toProfile"
          :photo="'http://localhost:3000/api/user/captcha/init'"
          :name="item.profile.name"
          :signature="item.profile.signature"
        ></list-item>
      </el-menu-item>

    </el-submenu>
    <el-submenu index="outline">
      <h4 slot="title">离线</h4>
      <el-menu-item
        v-for="(item,key) in this.$store.state.user.contacts"
        v-if="!inOnlineContacts( key )"
        :index="key"
        style="padding: 0"
      >
        <list-item
          :hasNewMessage="false"
          :toProfile="toProfile"
          :photo="'http://localhost:3000/api/user/captcha/init'"
          :name="item.profile.name"
          :signature="item.profile.signature"
        ></list-item>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="imGroup">
      <h4 slot="title">群组</h4>
      <el-menu-item
        v-for="(item,key) in this.$store.state.user.imGroup"
        style="padding: 0"
        :index="key">
        <list-item
          :hasNewMessage="item.hasNewMessage"
          :toProfile="toImGroupProfile"
          :photo="'http://localhost:3000/api/user/captcha/init'"
          :name="item.name"
          :signature="item.introduction"
        ></list-item>
      </el-menu-item>
    </el-submenu>
  </el-menu>

</div>
</template>

<script>
  import listItem from './listItem.vue'

  export default {
    data() {
      return {
      };
    },
    computed: {

    },
    methods: {
      inOnlineContacts( email ){
      	//todo 控制组件初始化时机
        return this.$store.state.onlineContacts.includes( email )
      },
      toProfile(){
      	this.$router.push( "profile" )
      },
      toImGroupProfile(){
        this.$router.push( "imGroupProfile" )
      }
    },
    components: {
      listItem
    }
  }
</script>
