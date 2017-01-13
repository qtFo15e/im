<template>
    <div>
      <h3>个人信息</h3>
      <el-form ref="form" :model="form" label-width="90px">
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
                label='生日'
                prop="birthday">
            <el-date-picker
                v-model="form.birthday"
                type="date"
                placeholder="选择日期"
            ></el-date-picker>
        </el-form-item>
        <el-form-item
            label="个人签名"
            prop="signature">
            <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    v-model="form.signature">
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="formSubmit">保存</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>

<script>
    export  default {
        data() {
            var ages = []
            for ( let age = 0 ; age <= 100; age++ ) {
                ages.push( age )
            }

            return {
                form: {
                    sex: "",
                    age: "",
                    birthday: "",
                    signature: ""
                },
                formConfigure: {
                    sex: [ "男", "女" ],
                    ages,

                }
            }
        },

        methods: {
            formSubmit () {
                this.$refs.form.validate()
            },
        }
    }
</script>
