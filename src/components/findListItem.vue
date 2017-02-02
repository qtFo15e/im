<template>
  <li>
    <el-row>
      <el-col :span="3" >
        <img :src="photo">
      </el-col>
      <el-col :span="16">
        <div>{{ info.name }} ({{info.imGroupId}})</div>
        <div>{{ info.introduction }}</div>
      </el-col>
      <el-col :span="5">
        <el-button :disabled="disabledJoin" @click="join" type="primary" icon="plus"></el-button>
      </el-col>
    </el-row>
  </li>
</template>

<script>
  export default {
    props: [ 'info','photo'],
    data(){
    	return {
        disabledJoin: false
      }
    },
    methods: {
      join: function () {
      	var self = this

        this.$store.state.io.emit( "message", {
          route: 'imGroupRelation',
          event: 'join',
          body: {
          	'imGroupId': self.info.imGroupId
          }
        },
          function ( res ) {
            if ( res.status ) {
              self.$notify({
                title: '提示',
                message: '成功加入群组',
                type: 'success'
              });

              self.$store.state.user.imGroup.push( res.body )
            } else {
              self.$notify({
                title: '提示',
                message: '您已经在群组中',
                type: 'warning'
              });
            }

            self.disabledJoin = true
        } )
      }
    },
    watch: {
    	info: function () {
        this.disabledJoin = false
      }
    }
  }
</script>
