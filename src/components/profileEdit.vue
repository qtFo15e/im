<template>
  <el-card style="width: 500px;">
    <h3>个人信息</h3>
    <el-form ref="form" :rules="rules" :model="form" label-width="90px">
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="头像">
            <div style="text-align: left">
              <img  src="http://localhost:3000/api/user/captcha/init" >
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="用户名"
            prop="name">
            <el-input
              style="width: 198px"
              v-model="form.name"
              placeholder="16个字母或8个汉字之内"></el-input>
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
        </el-col>
        <el-col :span="12">
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
            label='生日'
            prop="birthday">
            <el-date-picker
              v-model="form.birthday"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
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
        </el-col>
      </el-row>
      <el-form-item
        label="个人签名"
        prop="signature">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 2}"
          v-model="form.signature">
        </el-input>
      </el-form-item>
      <el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="formClose">关闭</el-button>
        <el-button type="primary" @click="formSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import location from '../assets/location.json'
  import util from  '../../util'

  //todo 时间有效性检查
  //todo 省份会卡一下， 猜测SYmbol, 加入拼音？

  export  default {
    data() {
      var ages = []
      for (let age = 0; age <= 100; age++) {
        ages.push(age)
      }

      return {
        form: {
          sex: "",
          age: "",
          birthday: "",
          signature: "",
          province: "",
          city:'',
          name:''
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
      },
    },

    methods: {
      formSubmit () {
      	var self = this
        this.$refs.form.validate( function ( valid ) {
          if ( valid ) {
          	self.$http.post( '/api/profile/edit' , self.form, function ( res ) {

            })
          }
        } )
      },
      formClose () {

      }
    }
  }
</script>

<style>
  .el-dragger__cover__interact .btn:nth-of-type(2) {
    visibility: hidden;
  }
</style>

