<template>
  <div>
    <h3>查找</h3>
    <el-tabs v-model="active" type="card">
      <el-tab-pane label="添加" name="userRelation" >
        <div style="height: 180px;margin-top: 30px;width: 400px">
          <el-input placeholder="请输入内容" v-model="contacts.value" >
            <el-select style="width: 100px" v-model="contacts.type" slot="prepend" placeholder="请选择">
              <el-option label="email" value="email"></el-option>
              <el-option label="用户名" value="profile.name"></el-option>
            </el-select>
            <el-button slot="append" icon="search" @click="searchUser"></el-button>
          </el-input>
          <div>
              <user-detail-list-item
                v-for="item in contactsArr"
                :photo="'http://localhost:3000/api/user/captcha/init'"
                :info="item">
              </user-detail-list-item>
            <div v-if="contactsArr !== null && contactsArr.length === 0 ">
              未找此用户
            </div>
          </div>
        </div>
        <div style="height: 180px;width: 400px">
            <el-input placeholder="请输入内容" v-model="imGroup.value" s>
              <el-select style="width: 100px" v-model="imGroup.type" slot="prepend" placeholder="请选择">
                <el-option label="群组ID" value="imGroupId"></el-option>
                <el-option label="群组名" value="name"></el-option>
              </el-select>
              <el-button slot="append" icon="search" @click="searchImGroup"></el-button>
            </el-input>
          <div>
            <detail-list-item
              v-for="item in imGroupArr"
              :photo="'http://localhost:3000/api/user/captcha/init'"
              :info="item">
            </detail-list-item>
            <div v-if="imGroupArr !== null && imGroupArr.length === 0 ">
              未找到群组
            </div>
          </div>
        </div>
      </el-tab-pane>

      <!--<el-tab-pane label="群组" name="imGroupRelation">-->

      <!--</el-tab-pane>-->

      <el-tab-pane label="新建群" name="newImGroup">
        <el-form
          ref="newImGroupForm"
          :rules="rules"
          :model="newGroupForm">
          <el-form-item
            style="width: 200px"
            label="群名"
            prop="name">
            <el-input v-model="newGroupForm.name" placeholder="16个字母或8个汉字之内" ></el-input>
          </el-form-item>
          <el-form-item
            label="简介"
            prop="introduction">
            <el-input
              row="2"
              type="textarea"
              v-model="newGroupForm.introduction" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item style="text-align: right">
            <el-button @click="createImGroup" type="primary"  style="width: 80px">创建</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import detailListItem from './findListItem.vue'
  import userDetailListItem  from  './findListUserItem.vue'
  import util from '../../util/index'


  export default {
    data() {
    	return {
    		active: 'userRelation',
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
        imGroupArr:null,
        searchedImGroup: false,
        contactsArr: null,
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

        if ( this.imGroup.value === '') return

        this.$store.state.io.emit('message',  {
          route: 'imGroupRelation',
          event: 'search',
          body: self.imGroup
        }, function ( imGroupArr ) {
          self.imGroupArr = imGroupArr
        } )
      },
      createImGroup () {
        var self = this

        this.$refs.newImGroupForm.validate( function ( valid ) {
          if ( valid ) {
            self.$store.state.io.emit('message', {
              route: 'imGroupRelation',
              event: 'create',
              body: self.newGroupForm
            }, function ( imGroup ) {
              self.$store.commit( 'addImGroup',imGroup )
              self.newGroupForm = {
                name: "",
                introduction: ""
              }
            });
          }
        } )
      },
      searchUser() {
        var self = this

        if ( this.contacts.value === '') return

        this.$store.state.io.emit('message',  {
          route: 'userRelation',
          event: 'search',
          body: self.contacts
        }, function ( contactsArr ) {
          self.contactsArr = contactsArr
        } )
      }
    },
    components: {
      detailListItem,
      userDetailListItem
    }
  }
</script>

<style>
  #app > div:nth-child(2) > div > div.el-col.el-col-16 > div > div > div > div > div.el-tabs__content > div:nth-child(3) > div > form > div.el-form-item.is-error.is-required > div {
    width: 200px;
  }
</style>
