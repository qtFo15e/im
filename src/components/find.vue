<template>
  <el-card style="width: 500px">
    <h3>查找联系人</h3>
    <el-tabs v-model="active" type="card">
      <el-tab-pane label="联系人" name="userRelation">
        <div>
          <el-input placeholder="请输入内容" v-model="contacts.value">
            <el-select style="width: 100px" v-model="contacts.type" slot="prepend" placeholder="请选择">
              <el-option label="email" value="email"></el-option>
              <el-option label="用户名" value="profile.name"></el-option>
            </el-select>
            <el-button slot="append" icon="search"></el-button>
          </el-input>
        </div>
      </el-tab-pane>
      <el-tab-pane label="群组" name="imGroupRelation">
        <div>
          <el-input placeholder="请输入内容" v-model="imGroup.value">
            <el-select style="width: 100px" v-model="imGroup.type" slot="prepend" placeholder="请选择">
              <el-option label="群组ID" value="imGroupId"></el-option>
              <el-option label="群组名" value="name"></el-option>
            </el-select>
            <el-button slot="append" icon="search" @click="searchImGroup"></el-button>
          </el-input>
        </div>
        <div>
          <ul style="list-style: none">
              <detail-list-item
                v-for="item in imGroupArr"
                :joinOrAdd="joinOrAdd"
                :route="active"
                :photo="'dasd'"
                :info="item">
              </detail-list-item>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="新建群" name="newImGroup">
        <el-form
          ref="newImGroupForm"
          :rules="rules"
          :model="newGroupForm">
          <el-form-item
            label="群名"
            prop="name">
            <el-input v-model="newGroupForm.name" placeholder="16个字母或8个汉字之内"></el-input>
          </el-form-item>
          <el-form-item
            label="简介"
            prop="introduction">
            <el-input
              type="textarea"
              v-model="newGroupForm.introduction" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="createImGroup" type="primary">创建</el-button>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
  import detailListItem from './findListItem.vue'
  import util from '../../util/index'

  export default {
    data() {
    	return {
    		active: 'imGroupRelation',
        contacts: {
    			type: "email",
          value: ""
        },
        imGroup: {
    			type:'imGroupId',
          value: ""
        },
        newGroupForm: {
    			name: "",
          introduction: ""
        },
        imGroupArr:[],
        rules: {
          name: [
            {
              required: true, message: '请输入用户名', trigger: 'blur'
            },
            {
              validator: (rule, value, callback) => {
                var length = util.realLength(value)
                if (length > 16) {
                  callback(new Error('群组名的长度不能超过16个字母或8个汉字'))
                } else {
                  callback()
                }
              },
              trigger: 'blur'
            },
          ]
        }
      }
    },
    methods: {
      searchImGroup: function () {
      	var self = this

        if ( this.imGroupValue === '') return


        self.socket = io()
        self.socket.emit('message',  {
          route: 'imGroupRelation',
          event: 'search',
          body: self.imGroup
        }, function ( imGroupArr ) {
          self.imGroupArr = imGroupArr
        } )
      },
      joinGroup:function () {
        var self = this
        this.$store.state.io.emit( "message", {
          route: self.active,
          event: self.active === 'imGroupRelation' ?  "join" : 'add',
        }, function (  ) {

        } )
      },
      addContacts: function () {

      },
      joinOrAdd( info ) {
      	var self = this

        var event, body
        if ( self.active === 'imGroupRelation') {
      		event = 'join'
          body = {
            imGroupId: info,id
          }
        } else {
      		event = 'add'
          body = {
            email: info.id
          }
        }

      	this.$store.state.io.emit( "message", {
          route: self.active,
          event,
          body
        }, function (  ) {

        } )
      },
      createImGroup () {
        var self = this

        this.$refs.newImGroupForm.validate( function ( valid ) {
          if ( valid ) {
            self.socket = io()
            self.socket.emit('message', {
              route: 'imGroupRelation',
              event: 'create',
              body: self.newGroupForm
            }, function (groupId) {
//              console.log( Object.assign( {}, self.newGroupForm, { groupId, } )  )
//              console.log( this.$store.state )
            });
          }
        } )
      },
    },
    components: {
      detailListItem
    }
  }
</script>
