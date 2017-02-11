<template>
<div >
  <!--&lt;!&ndash;todo v-for 中建立索引&ndash;&gt;-->
  <vue-scrollbar
    classes="list-scrollbar"
    ref="Scrollbar">
    <div>
      <el-menu theme="dark"   mode="vertical"  style="border-radius: 15px"  >
        <el-submenu index="online">
          <h4 slot="title">在线</h4>
          <el-menu-item
            v-for="(item,key) in this.$store.state.user.contacts"
            v-if="inOnlineContacts( key )"
            :index="key"
            style="padding: 0">
            <list-item
              :receiver="key"
              route="userMessage"
              :hasNewMessage="item.hasNewMessage"
              :photo="'/api/profile/photo/' + key "
              :name="item.profile.name"
              :signature="item.profile.signature"
              :group="'online'"
            ></list-item>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="outline">
          <h4 slot="title">离线</h4>
          <el-menu-item
            v-for="(item,key) in this.$store.state.user.contacts"
            v-if="!inOnlineContacts( key )"
            :index="key"
            style="padding: 0">
            <list-item
              :receiver="key"
              route="userMessage"
              :hasNewMessage="false"
              :photo="'/api/profile/photo/' + key "
              :name="item.profile.name"
              :signature="item.profile.signature"
              :group="'outline'"
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
              :receiver="key"
              route="imGroupMessage"
              :hasNewMessage="item.hasNewMessage"
              :photo="'/api/profile/photo/group'"
              :name="item.name"
              :signature="item.introduction"
              :group="'group'"
            ></list-item>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </vue-scrollbar>
</div>
</template>

<script>
  import listItem from './listItem.vue'
  import VueScrollbar from 'vue2-scrollbar';

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
      	var self = this
        console.log( self )
//        console.log( self.)
//        self.$router.push( "profile" )
      },
      toImGroupProfile(){
        this.$router.push( "imGroupProfile" )
      }
    },
    components: {
      listItem,
      VueScrollbar
    }
  }
</script>

<style>
  .list-scrollbar {
    height: 400px;
  }
</style>
