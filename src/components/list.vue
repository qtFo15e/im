<template>
<div id="list">
  <el-tabs >
    <el-tab-pane>
      <span slot="label"><i class=" fa fa-lg fa-user " aria-hidden="true"></i> 好友</span>
      <div
        v-for="(item,key) in this.$store.state.user.contacts"
        v-if="inOnlineContacts( key )"
        :index="key">
        <list-item
          :receiver="key"
          route="userMessage"
          :photo="'/api/profile/photo/' + key "
          :name="item.profile.name"
          :signature="item.profile.signature"
          :group="'online'"
        ></list-item>
      </div>
    </el-tab-pane>
    <el-tab-pane label="定时任务补偿">
      <span slot="label"><i class=" fa fa-lg fa-user-o " aria-hidden="true"></i> 离线</span>
      <div
        v-for="(item,key) in this.$store.state.user.contacts"
        v-if="!inOnlineContacts( key )"
        :index="key"
        style="padding: 0">
        <list-item
          :receiver="key"
          route="userMessage"
          :photo="'/api/profile/photo/' + key "
          :name="item.profile.name"
          :signature="item.profile.signature"
          :group="'outline'"
        ></list-item>
      </div>
    </el-tab-pane>
    <el-tab-pane>
      <span slot="label"><i class=" fa fa-lg fa-group " aria-hidden="true"></i> 群组</span>
      <div
        v-for="(item,key) in this.$store.state.user.imGroup"
        style="padding: 0"
        :index="key">
        <list-item
          :receiver="key"
          route="imGroupMessage"
          :photo="'/api/profile/photo/group'"
          :name="item.name"
          :signature="item.introduction"
          :group="'group'"
        ></list-item>
      </div>
    </el-tab-pane>
  </el-tabs>
  <!--todo v-for 中建立索引-->
  <vue-scrollbar v-if="false"
    classes="list-scrollbar"
    ref="Scrollbar">
    <div >
      <el-menu theme="light"   mode="horizontal"  style="text-align: left"  >
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

  #list div.el-tabs__header > div {
    width: 33.333333%;
  }
</style>
