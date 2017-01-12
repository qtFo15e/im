<template>
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
                v-model="form.password"
                placeholder="密码"
            ></el-input>
        </el-form-item>
        <el-form-item>
            <el-checkbox v-model="form.savePassword" >记住密码</el-checkbox>
            <el-button type="primary" @click="formSubmit">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        data () {
            return {
                form: {
                    email:"",
                    password:"",
                    savePassword: false
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
                }
            }
        },

        methods: {
            formSubmit () {
//                this.$refs.form.validate()
              this.$http.post( "/test", {
                password:123,
                email:456
              } )
            },
        }
    }
</script>
