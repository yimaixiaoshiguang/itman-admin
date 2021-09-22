<template>
    <el-form
        ref="userForm"
        :model="userForm"
        :rules="userRules"
        label-width="100px"
        style="width: 80%"
    >
        <el-form-item prop="username" label="用户账号">
            <el-input
                v-model="userForm.username"
                placeholder="用户账号"
                :disabled="addOrEdit == 'edit'"
            />
        </el-form-item>
        <el-form-item prop="fullName" label="用户名称">
            <el-input
                v-model="userForm.fullName"
                placeholder="用户名称"
                :disabled="addOrEdit == 'edit'"
            />
        </el-form-item>
        <el-form-item prop="mobile" label="手机号码">
            <el-input v-model.number="userForm.mobile" placeholder="手机号码" />
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
            <el-input v-model="userForm.email" placeholder="邮箱" />
        </el-form-item>
        <el-form-item
            v-show="userForm.roleIds.indexOf(supplierRoleId) == -1"
            prop="roleIds"
            label="角色分配"
        >
            <el-select
                v-model="userForm.roleIds"
                multiple
                placeholder="请选择角色"
                style="width: 100%"
            >
                <el-option
                    v-for="item in roleNotSupplier"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                />
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" class="form-submit" @click="addSubmit('userForm')">
                <template v-if="addOrEdit == 'add'"> 新增 </template>
                <template v-else> 保存 </template>
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { isMobile, isChinese } from '@/utils/validate'
import { mapState, mapActions } from 'vuex'

export default {
    name: '',
    props: {
        addOrEdit: {
            type: String,
            default: 'add',
            required: true
        }
    },
    components: {},
    data() {
        return {
            userForm: {
                id: '',
                username: '',
                mobile: '',
                email: '',
                fullName: '',
                roleIds: []
            },
            userRules: {
                username: [
                    {
                        required: true,
                        message: '请输入用户账号',
                        trigger: 'blur'
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (isChinese(value)) {
                                callback(new Error('用户账号不能包含中文'))
                            } else {
                                callback()
                            }
                        },
                        trigger: ['change', 'blur']
                    }
                ],
                fullName: [
                    {
                        required: true,
                        message: '请输入用户名称',
                        trigger: 'blur'
                    }
                ],
                mobile: [
                    {
                        required: true,
                        message: '请输入手机号码',
                        trigger: 'blur'
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (!isMobile(value)) {
                                callback(new Error('手机号格式错误'))
                            } else {
                                callback()
                            }
                        },
                        trigger: ['change', 'blur']
                    }
                ]
            },

            roleLists: [] // 角色列表
        }
    },
    computed: {
        ...mapState('dict', ['rolelist']),

        roleNotSupplier() {
            // 过滤供应商角色
            return (
                this.rolelist.length > 0 &&
                this.rolelist.filter(item => item.code !== 'SUPPLIER')
            )
        },

        supplierRoleId() {
            // 供应商角色id
            return (
                this.rolelist.length > 0 &&
                this.rolelist.filter(item => item.code === 'SUPPLIER')[0].id
            )
        }
    },
    watch: {},
    methods: {
        ...mapActions('dict', ['getRoleList']),

        addSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$emit('submit', this.userForm)
                } else {
                    return false
                }
            })
        }
    },
    mounted() {
        if (this.rolelist.length == 0) {
            this.getRoleList()
        }

        if (this.addOrEdit == 'edit') {
            this.userForm = this.$attrs.userInfo
            // this.userForm.roleIds = this.userForm.role.map(item => item.id)
            this.$set(
                this.userForm,
                'roleIds',
                this.userForm.role.map(item => item.id)
            )
        }
    }
}
</script>

<style lang="scss" scoped></style>
