<template>
    <div class="mvk-layout-content-card">
        <el-form
            ref="form"
            :model="pwForm"
            :rules="pwRules"
            label-width="120px"
            :inline="false"
        >
            <el-form-item label="用户名:" prop="username" class="inputWidth">
                <!-- <el-input v-model="pwForm.username" disabled></el-input> -->
                {{ pwForm.username }}
            </el-form-item>
            <el-form-item label="姓名:" prop="fullName" class="inputWidth">
                <!-- <el-input v-model="pwForm.fillName"></el-input> -->
                {{ pwForm.fullName }}
            </el-form-item>
            <el-form-item label="手机号码:" prop="mobile" class="inputWidth">
                <!-- <el-input v-model="pwForm.mobile"></el-input> -->
                {{ pwForm.mobile }}
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { personalInfo } from 'api/basePage/user'

export default {
    components: {},
    props: {},
    data() {
        return {
            pwForm: {
                id: '',
                fullName: '',
                username: '',
                mobile: ''
            },
            pwRules: {
                oldPassword: [
                    {
                        required: true,
                        trigger: 'blur',
                        message: '请输入原始密码'
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
                                    callback(
                                        new Error('新密码不能和原始密码相同')
                                    )
                                }
                            }
                        }
                    }
                ]
            }
        }
    },
    watch: {},
    computed: {},
    methods: {
        handleCancel() {
            this.$router.push('/dashboard/index')
        },

        getPersonInfo() {
            personalInfo().then(res => {
                this.pwForm = res.data
            })
        }
    },
    created() {},
    mounted() {
        this.getPersonInfo()
    }
}
</script>
<style lang="scss" scoped></style>
