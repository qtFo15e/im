<template>
<el-card style="width: 250px">
  <el-collapse v-model="activeRelation" accordion>
    <el-collapse-item title="在线" name="online">
    </el-collapse-item>
    <el-collapse-item title="离线" name="outline">

    </el-collapse-item>
    <el-collapse-item title="群组" name="imGroup">
      <ul style="list-style: none;padding: 0">
        <list-item
          v-for=""
          name="迟猛"
          signature="我是最刷的,哈哈哈">
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
