<template>
<el-card style="width: 250px">
  <el-collapse v-model="activeRelation" accordion>
    <el-collapse-item title="在线" name="online">
      <ul style="list-style: none;padding: 0">
        <list-item
          v-for="item in this.$store.state.user.contacts"
          :photo="'http://localhost:3000/api/user/captcha/init'"
          :name="item.profile.name"
          :signature="item.profile.signature">
        </list-item>
      </ul>
    </el-collapse-item>
    <el-collapse-item title="离线" name="outline">
    </el-collapse-item>
    <el-collapse-item title="群组" name="imGroup">
      <ul style="list-style: none;padding: 0">
        <list-item
          v-for="item in this.$store.state.user.imGroup"
          :photo="'http://localhost:3000/api/user/captcha/init'"
          :name="item.name"
          :signature="item.introduction">
        </list-item>
      </ul>
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
      imGtoupArr: function () {
        return this.$store.state.user.imGroup
      }
    },
    components: {
      listItem
    }
  }
</script>
