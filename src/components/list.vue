<template>
<div style="width: 250px">
  <!--<el-collapse v-model="activeRelation" accordion>-->
    <!--<el-collapse-item title="在线" name="online">-->
      <!--&lt;!&ndash; todo  遍历并判断  -> jsx 或 render 重写&ndash;&gt;-->
      <!--&lt;!&ndash;todo v-for 中建立索引&ndash;&gt;-->
      <!--<div style="padding: 0">-->
        <!--<list-item-->
          <!--v-for="(item,key) in this.$store.state.user.contacts"-->
          <!--v-if="inOnlineContacts( key )"-->
          <!--:photo="'http://localhost:3000/api/user/captcha/init'"-->
          <!--:name="item.profile.name"-->
          <!--:signature="item.profile.signature">-->
        <!--</list-item>-->
      <!--</div>-->
    <!--</el-collapse-item>-->
    <!--<el-collapse-item title="离线" name="outline">-->
      <!--<div style="padding: 0">-->
        <!--<list-item-->
          <!--v-for="(item,key) in this.$store.state.user.contacts"-->
          <!--v-if="!inOnlineContacts( key )"-->
          <!--:photo="'http://localhost:3000/api/user/captcha/init'"-->
          <!--:name="item.profile.name"-->
          <!--:signature="item.profile.signature">-->
        <!--</list-item>-->
      <!--</div>-->
    <!--</el-collapse-item>-->
    <!--<el-collapse-item title="群组" name="imGroup">-->
      <!--<div style="padding: 0">-->
        <!--<list-item-->
          <!--v-for="item in this.$store.state.user.imGroup"-->
          <!--:photo="'http://localhost:3000/api/user/captcha/init'"-->
          <!--:name="item.name"-->
          <!--:signature="item.introduction">-->
        <!--</list-item>-->
      <!--</div>-->
    <!--</el-collapse-item>-->
  <!--</el-collapse>-->

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
        activeRelation: 'online',
      };
    },
    computed: {

    },
    methods: {
      inOnlineContacts( email ){
      	//todo 控制组件初始化时机
        return this.$store.state.onlineContacts.includes( email )
      }
    },
    components: {
      listItem
    }
  }
</script>
