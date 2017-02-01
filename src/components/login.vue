<template>
  <div>
    <div>
    </div>
    <el-card style="width: 400px">
      <h3  style="line-height: 36px;background: #20a0ff">账号登录</h3>
      <el-form
        ref="loginForm"
        :model="form"
        :rules="rules"
        label-width="90px">
        <el-form-item
          prop="email"
          label="账号">
          <el-input
            v-model="form.email"
            placeholder="邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="captcha"
          label="验证码">
          <el-col :span="8">
            <el-input
              v-model="form.captcha"
              placeholder="验证码">
            </el-input>
          </el-col>
          <el-col :span="8">
            <img
              :src="captchaSrc"
              style="border: 1px solid #c0ccda;border-radius: 3px"/>
          </el-col>
          <el-col :span="8">
            <el-button
              type="text"
              @click="changeCaptchaImg">
              换一张</el-button>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-checkbox
            v-model="form.savePassword"
          >记住密码</el-checkbox>
          <el-button
            type="primary"
            @click="formSubmit"
          >登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="text">
            立即注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        form: {
          email: "123@qq.com",
          password: "123465",
          captcha: "",
          savePassword: true
        },
        captchaSrc: "http://localhost:3000/api/user/captcha/init",
        rules: {
          email: [
            {
              validator: function(rule, value, callback) {
                if (value === "" || value === undefined ) {
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
              validator: function(rule, value, callback) {
              	if (value === "" || value === undefined ) {
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
          captcha: [
            {
              validator: function(rule, value, callback) {
              	if (value === "" || value === undefined ) {
              		callback( new Error('请输入验证码') )
                } else {
              		callback()
                }
              }
            }
          ],
        }
      }
    },

    methods: {
      formSubmit () {
      	var self = this
        this.$refs.loginForm.validate( function (valid) {
          if (valid) {
            self.$http.post("/api/user/login", self.form )
              .then( function ( res ) {
              	// todo  使用set和get才能触发插件？
                self.$store.state.user = res.body
                //todo 流程完善后接触注释
//                self.$store.state.io = io()
              } )
            self.$store.state.user.photo = 'http://localhost:3000/api/profile/photo'
          }
        })
      },
      changeCaptchaImg () {
        this.captchaSrc = "http://localhost:3000/api/user/captcha/" + Math.random()
      }
    }
  }

</script>
