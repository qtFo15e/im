<template>
  <li>
    <el-row>
      <el-col :span="3" >
        <img :src="photo">
      </el-col>
      <el-col :span="16">
        <div>{{ info.profile.name }} ({{info.email}})</div>
        <div>{{ info.profile.signature }}</div>
      </el-col>
      <el-col :span="5">
        <el-button :disabled="disabledJoin" @click="add" type="primary" icon="plus"></el-button>
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
      add: function () {
        var self = this

        if ( self.info.email ===  self.$store.state.user.email ) {
          self.$notify({
            title: '提示',
            message: '不能添加自己为好友',
            type: 'warning'
          });
          self.disabledJoin = true
        	return
        }


        this.$store.state.io.emit( "message", {
            route: 'userRelation',
            event: 'add',
            body: {
              'email': self.info.email
            }
          },
          function ( res ) {
            if ( res.status ) {
              self.$notify({
                title: '提示',
                message: '成功添加好友',
                type: 'success'
              });

              self.$store.commit( 'addContacts', res.body)
            } else {
              self.$notify({
                title: '提示',
                message: '已经在好友列表中',
                type: 'warning'
              });
            }
            self.disabledJoin = true
          } )
      },
    },
    watch: {
      info: function () {
        this.disabledJoin = false
      }
    }
  }
</script>
