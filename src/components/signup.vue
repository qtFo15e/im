<template>
<el-card class="box-card" style="width: 400px">
  <div  slot="header" class="clearfix" style="background: #20a0ff">
    <span style="line-height: 36px;">注册账号</span>
  </div>
  <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="90px" >
    <el-form-item
        prop="email"
        label="账号">
      <el-input
        type="text"
        v-model="form.email"
        placeholder="邮箱" ></el-input>
    </el-form-item>
    <el-form-item
        prop="password"
        label="密码">
      <el-input
        type="password"
        v-model="form.password"
        placeholder="6-10个字母或数字"
        auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item
        prop="passwordRepeat"
        label="确认密码">
      <el-input
        type="password"
        v-model="form.passwordRepeat"
        placeholder="再次输入密码"
        auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item
        prop="name"
        label="用户名">
      <el-input
        v-model="form.name"
        placeholder="16个字母或8个汉字之内" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="default" @click="formReset">重置</el-button>
      <el-button type="primary" @click="formSubmit">立即注册</el-button>
    </el-form-item>
    <el-form-item>
        <el-button type="text">已有账号？登录</el-button>
    </el-form-item>
  </el-form>
</el-card>
</template>

<script>
   import util from  '../../util'

   export default {
      data () {
          return {
              form: {
                  email: "",
                  name:"",
                  passport: "",
                  passwordRepeat: ""
              },

              rules: {
                  email: [
                      {
                          required: true,
                          message: "请输入邮箱",
                          trigger: "blur"
                      },
                      {
                          validator: ( rule, value, callBack ) => {
                              var emailReg = /[\d\w]+?@\w+?/
                              if ( !emailReg.test( value ) ) {
                                  callBack( new Error( '请输入合法的邮箱' ) )
                              }
                          },
                          trigger: 'blur'
                      }
                  ],

                  password: [
                      {
                          required: true,
                          message: "请输入密码",
                          trigger: "blur"
                      },
                      {
                          validator:  (rule, value, callback) => {
                              var passwordReg = /[\d\w]{6,10}/
                              if ( !passwordReg.test( value ) ) {
                                  callback( new Error( '请输入6-10个字母或数字' ) )
                              }
                          },
                          trigger: "blur"
                      }
                  ],

                  passwordRepeat: [
                      {
                          required: true,
                          message: "请再次输入密码",
                          trigger: "blur"
                      },
                      {
                          validator:  (rule, value, callback) => {
                              console.log( value )
                              console.log( this.form.password )
                              if ( value !== this.form.password ) {
                                  callback( new Error( '两次输入密码不一致' ) )
                              }
                          },
                          trigger: "blur"
                      }
                  ],

                  name: [
                      {
                          required: true,
                          message: '请输入用户名',
                          trigger: 'blur'
                      },
                      {
                          validator:  (rule, value, callback) => {
                            var length = util.realLength( value )
                            if ( length > 16 ) {
                                callback( new Error( '用户名的长度不能超过16个字母或8个汉字' ) )
                            }
                          },
                          trigger: 'blur'
                      }
                  ]
              }
          }
      },

      methods: {
          formSubmit () {
              this.$refs.form.validate()
          },
          formReset () {
              this.$refs.form.resetFields()
          }
      }
  }
</script>

<style scoped rel="stylesheet/stylus" type="text/css">

</style>
