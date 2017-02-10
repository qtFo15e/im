<template>
  <div>
    <h3  slot="header" style="line-height: 36px;background: #20a0ff;margin-bottom: 30px;border-radius: 4px;color: #fff">用户登录</h3>
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
          style="margin-bottom: 15px"
          prop="captcha"
          label="验证码">
          <el-col :span="24">
            <el-row :gutter="1">
              <el-col :span="11">
                <el-input
                  v-model="form.captcha"
                  placeholder="验证码">
                </el-input>
              </el-col>
              <el-col :span="8" style="padding: 2px;height: 36px">
                <img
                  style="width: 100%;height: 100%"
                  :src="captchaSrc"/>
              </el-col>
              <el-col :span="5" style="text-align: center">
                <el-button
                  type="text"
                  @click="changeCaptchaImg">
                  换一张</el-button>
              </el-col>
            </el-row>
          </el-col>


        </el-form-item>
        <el-form-item style="text-align: center">

          <el-col :span="12" style="margin-top: 6px;text-align: right">
            <el-checkbox
              v-model="form.savePassword"
            >记住密码</el-checkbox>
          </el-col>
          <el-col :span="12" style="text-align: right">
            <el-button
              style="width: 80px;margin-right: 10px"
              type="primary"
              @click="formSubmit"
            >登 录</el-button>
            <el-button
              style="margin-right: 31px"
              size="small"
              type="text"
              @click="toSignup">
              立即注册
            </el-button>
          </el-col>
        </el-form-item>
      </el-form>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        form: {
          email: "123@qq.com",
          password: "123456",
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
                self.$store.commit( 'initSocket', self )
                self.$store.commit( "initUser" , res.body )

                self.$router.push( "index" )
              } )
          }
        })
      },
      changeCaptchaImg () {
        this.captchaSrc = "http://localhost:3000/api/user/captcha/" + Math.random()
      },
      toSignup(){
        this.$router.push( 'signup' )
      }
    }
  }

</script>
