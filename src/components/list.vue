<template>
<el-card style="width: 250px">
  <el-collapse v-model="activeRelation" accordion>
    <el-collapse-item title="在线" name="online">
      <!-- todo  遍历并判断  -> jsx 或 render 重写-->
      <!--todo v-for 中建立索引-->
      <div style="padding: 0">
        <list-item
          v-for="(item,key) in this.$store.state.user.contacts"
          v-if="inOnlineContacts( key )"
          :photo="'http://localhost:3000/api/user/captcha/init'"
          :name="item.profile.name"
          :signature="item.profile.signature">
        </list-item>
      </div>
    </el-collapse-item>
    <el-collapse-item title="离线" name="outline">
      <div style="padding: 0">
        <list-item
          v-for="(item,key) in this.$store.state.user.contacts"
          v-if="!inOnlineContacts( key )"
          :photo="'http://localhost:3000/api/user/captcha/init'"
          :name="item.profile.name"
          :signature="item.profile.signature">
        </list-item>
      </div>
    </el-collapse-item>
    <el-collapse-item title="群组" name="imGroup">
      <div style="padding: 0">
        <list-item
          v-for="item in this.$store.state.user.imGroup"
          :photo="'http://localhost:3000/api/user/captcha/init'"
          :name="item.name"
          :signature="item.introduction">
        </list-item>
      </div>
    </el-collapse-item>
  </el-collapse>
</el-card>
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
