<template>
  <div>
    <h3 style="line-height: 36px;background: #20a0ff;margin-bottom: 30px;border-radius: 4px;color: #fff">注册账号</h3>
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="90px">
      <el-form-item
        prop="email"
        label="账号">
        <el-input
          type="text"
          v-model="form.email"
          placeholder="邮箱"></el-input>
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
          placeholder="16个字母或8个汉字之内"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="text" @click="toLogin">已有账号？登录</el-button>
        <el-button type="primary" @click="formSubmit">立即注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import util from  '../../util'

  export default {
    data () {
      return {
        form: {
          email: "",
          passport: "",
          name: ""
        },
        passwordRepeat: "",
        rules: {
          email: [
            {
              validator: function (rule, value, callback) {
                if ( value === "" || value === undefined ) {
                  callback( new Error( "请输入邮箱" ) )
                  return
                }
                var emailReg = /[\d\w]+?@\w+?/
                if (!emailReg.test(value)) {
                  callback(new Error('请输入合法的邮箱'))
                } else {
                  callback()
                }
              },
              trigger: 'blur'
            }
          ],

          password: [
            {
              validator: (rule, value, callback) => {
                if ( value === "" || value === undefined ) {
                  callback( new Error( "请输入密码" ) )
                  return
                }
                var passwordReg = /[\d\w]{6,10}/
                if (!passwordReg.test(value)) {
                  callback(new Error('请输入6-10个字母或数字'))
                } else {
                	callback()
                }
              },
              trigger: "blur"
            }
          ],

          passwordRepeat: [
            {
              validator: (rule, value, callback) => {
                if ( value === "" || value === undefined ) {
                  callback( new Error( "请再次输入密码" ) )
                  return
                }
                if (value !== this.form.password) {
                  callback(new Error('两次输入密码不一致'))
                } else {
                	callback()
                }
              },
              trigger: "blur"
            }
          ],

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

    methods: {
      formSubmit () {
      	var self = this

        this.$refs.form.validate( function ( valid ) {
          if ( valid ) {
            self.$http.post("/api/user/signup", self.form)
              .then( function (res) {
                if ( res.status == 200 ) {
                  self.$alert('注册成功', '提示', {
                  	type: "success",
                    confirmButtonText: '确定',
                    callback: function () {
                      self.$router.push( "login" )
                    }
                  });

                }
              } )
          }
        } )
      },
      toLogin () {
        this.$router.push( "login" )
      }
    }
  }
</script>

<style scoped rel="stylesheet/stylus" type="text/css">

</style>
