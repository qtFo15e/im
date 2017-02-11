<template>
  <div style="margin-top: 10px">
    <el-row :gutter="10">
      <el-col :span="3" >
        <div style="height: 50px;width: 50px">
          <img class="photo" src="/api/profile/photo/group">
        </div>
      </el-col>
      <el-col :span="16" style="text-align: left">
        <div>{{ info.name }} ({{info.imGroupId}})</div>
        <div>{{ info.introduction }}</div>
      </el-col>
      <el-col :span="5">
        <el-button :disabled="disabledJoin" @click="join" type="primary" icon="plus" size="small"></el-button>
      </el-col>
    </el-row>
  </div>
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

              self.$store.commit( 'addImGroup', res.body )
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
