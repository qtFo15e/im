<template>
  <div id="profileEdit">
    <h3>个人信息</h3>
    <vue-scrollbar style="height: 450px" speed="200">
        <el-form ref="form" :rules="rules" :model="form" label-width="80px" label-position="right" style="margin: auto">
          <el-form-item
            label="头像">
            <div style="text-align: left">
              <div style="height: 50px;width: 50px;display: inline-block">
                <img class="photo" :src="this.$store.state.photo" >
              </div>
              <el-button type="text" @click="uploadPhtoto">上传</el-button>
            </div>
          </el-form-item>
          <el-form-item
            label="用户名"
            prop="name">
            <el-input
              v-model="form.name"
              placeholder="16个字母或8个汉字之内"></el-input>
          </el-form-item>
          <el-form-item
            label='生日'
            prop="birthday">
            <el-date-picker
              v-model="form.birthday"
              format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item
            prop="province"
            label="省份">
            <el-select
              v-model="form.province"
              filterable
              placeholder="请选择">
              <el-option
                v-for="(item,key) in location"
                :value="key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            prop="city"
            label="城市">
            <el-select
              v-model="form.city"
              filterable
              :disabled="form.province === ''"
              placeholder="请选择">
              <el-option
                v-for="city in showCity"
                :value="city">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label='年龄'
            prop="age">
            <el-select
              v-model="form.age"
              placeholder="选择年龄">
              <el-option
                v-for="age in formConfigure.ages"
                :value="age">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label='性别'
            prop="sex">
            <el-select
              v-model="form.sex"
              placeholder="选择性别">
              <el-option
                v-for="item in formConfigure.sex"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>


          <el-form-item
            label="个人签名"
            prop="signature">
            <el-input
              class="profileTextarea"
              type="textarea"
              v-model="form.signature">
            </el-input>
          </el-form-item>
          <el-form-item style="text-align: right">
            <el-button type="primary" @click="formSubmit">保存</el-button>
          </el-form-item>
        </el-form>

    </vue-scrollbar>

  </div>
</template>

<script>
  import location from '../assets/location.json'
  import util from  '../../util'
  var moment = require( 'moment' )
  import VueScrollbar from 'vue2-scrollbar';

  //todo 时间有效性检查
  //todo 省份会卡一下， 猜测SYmbol, 加入拼音？

  export  default {
    data() {
      var ages = []
      for (let age = 0; age <= 100; age++) {
        ages.push(age)
      }
      var self = this

      return {
        form: {
          sex: self.$store.state.user.profile.sex,
          age: self.$store.state.user.profile.age,
          birthday: self.$store.state.user.profile.birthday,
          signature: self.$store.state.user.profile.signature,
          province: self.$store.state.user.profile.province,
          city:self.$store.state.user.profile.city,
          name:self.$store.state.user.profile.name
        },
        location,
        photo: "",
        formConfigure: {
          sex: ["男", "女"],
          ages,
        },
        rules: {
          name: [
            {
              validator: (rule, value, callback) => {
                if ( value === "" || value === undefined ) {
                  callback( new Error( "请输入用户名" ) )
                  return
                }

                var length = util.realLength(value)
                if (length > 16) {
                  callback(new Error('用户名的长度不能超过16个字母或8个汉字'))
                } else {
                  callback()
                }
              },
              trigger: 'blur'
            }
          ]
        }
      }
    },

    computed: {
      //todo 过渡动画方向改成横向
      showCity: function () {
        if ( this.form.province ) {
          var provinces = this.location[ this.form.province ]
          if ( this.form.city && !provinces.includes( this.form.city ) ) {
            this.form.city = ''
          }
          return provinces
        } else {
          return []
        }
      }
    },

    methods: {
      formSubmit () {
      	var self = this
        this.$refs.form.validate( function ( valid ) {
          if ( valid ) {
          	self.form.birthday = moment(self.form.birthday).format( "YYYY-MM-DD" );
          	self.$http.post( '/api/profile/edit' , self.form)
              .then( function ( res ) {
                self.$store.state.user.profile = self.form
                self.$router.push( "profile" )
              } )
          }
        } )
      },
      uploadPhtoto(){
        this.$router.push( "uploadPhoto" )
      }
    },

    components: {
      VueScrollbar
    }
  }
</script>

<style>
  .profileTextarea textarea {
    height: 63px;
    max-height: 63px;
  }

  .el-dragger__cover__interact .btn:nth-of-type(2) {
    visibility: hidden;
  }

  .el-date-editor.el-input {
    width: 100%;
  }

  #profileEdit .el-form-item {
    width: 60%;
    margin-left: auto;
    margin-right: auto;
  }
  #profileEdit .el-form-item  .el-select{
    width: 100%;
  }

  #profileEdit > div > div > form > div:nth-child(1) > label {
    position: relative;
    top: 27px
  }
</style>

