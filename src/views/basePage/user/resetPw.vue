<template>
    <div class="mvk-layout-content-card">
        <el-form
            ref="pwForm"
            :model="pwForm"
            :rules="pwRules"
            status-icon
            :inline-message="true"
            label-width="150px"
        >
            <el-form-item label="旧密码" prop="oldPassword">
                <el-input
                    v-model="pwForm.oldPassword"
                    type="password"
                    placeholder="请输入旧密码"
                    autocomplete="off"
                    show-password
                    class="inputWidth"
                />
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <el-input
                    v-model="pwForm.newPassword"
                    type="password"
                    placeholder="请输入新密码"
                    autocomplete="off"
                    show-password
                    class="inputWidth"
                />
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
                <el-input
                    v-model="pwForm.confirmPassword"
                    type="password"
                    placeholder="请重新输入密码"
                    autocomplete="off"
                    show-password
                    class="inputWidth"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="form-submit" @click="handleSubmit('pwForm')">
                    确认
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { resetPW } from 'api/basePage/user.js'
export default {
    name: '',
    data() {
        return {
            pwForm: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            },
            pwRules: {
                oldPassword: [
                    {
                        required: true,
                        trigger: 'blur',
                        message: '请输入旧密码'
                    }
                ],
                newPassword: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请输入新密码'))
                            } else {
                                if (value == this.pwForm.oldPassword) {
                                    callback(new Error('新密码不能和旧密码相同'))
                                } else {
                                    if (this.pwForm.confirmPassword !== '') {
                                        this.$refs.pwForm.validateField('confirmPassword')
                                    }
                                    callback()
                                }
                            }
                        }
                    }
                ],
                confirmPassword: [
                    {
                        required: true,
                        trigger: 'blur',
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请再次输入密码'))
                            } else if (value !== this.pwForm.newPassword) {
                                callback(new Error('两次输入密码不一致!'))
                            } else {
                                callback()
                            }
                        }
                    }
                ]
            }
        }
    },
    watch: {
    },
    methods: {
        handleSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    resetPW(this.pwForm)
                        .then(res => {
                            if (res.status == 'BAD_REQUEST') {
                                this.$notify.warning({
                                    title: res.message
                                })
                            } else {
                                this.$notify.success({
                                    title: '密码修改成功'
                                })
                                this.$emit('editPwSuccess')
                            }
                        })
                        .catch(() => {
                            this.$notify.error({
                                title: '密码修改失败'
                            })
                        })
                } else {
                    return false
                }
            })
        }
        //
    },
    mounted() {}
}
</script>

<style lang="scss" scoped></style>
