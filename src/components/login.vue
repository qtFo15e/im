<template>
  <div>
    <h3>账号登录</h3>
    <el-form
      ref="form"
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
        <el-input
          v-model="form.captcha"
          placeholder="验证码">
        </el-input>
        <img ref="captchaImg" :src="captchaSrc" style="border: 1px solid #c0ccda;border-radius: 3px">
        <el-button type="text" @click="changeCaptchaImg">换一张</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="formSubmit">登录</el-button>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="form.savePassword" >记住密码</el-checkbox>
        <el-button type="text" >立即注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        data () {
            return {
                form: {
                    email:"",
                    password:"",
                    captcha:"",
                    savePassword: true
                },
                captchaSrc:"http://localhost:3000/api/user/captcha/init",
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
                    captcha: [
                        {
                            required: true,
                            message: "请输入验证码",
                            trigger: "blur"
                        },
                    ],
                }
            }
        },

        methods: {
            formSubmit () {
                this.$refs.form.validate( ( valid ) => {
                    if ( valid ) {
                        this.$http.post( "/api/user/login", this.form, function ( res ) {
                        } )
                    }
                } )
            },
            changeCaptchaImg () {
                this.$refs.captchaImg.src =  "http://localhost:3000/api/user/captcha/" + Math.random()
            }
        }
    }
</script>
