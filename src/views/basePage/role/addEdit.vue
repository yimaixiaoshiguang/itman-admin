<template>
    <el-drawer :title="title" :visible.sync="addEditDialog" size="50%">
        <div class="drawer-content">
            <el-form ref="roleForm" :model="roleForm" :rules="roleRules" label-width="120px">
                <el-form-item prop="name" label="角色名称">
                    <el-input
                        v-model="roleForm.name"
                        placeholder="请输入角色名称"
                        class="inputWidth"
                        :disabled="roleForm.internal"
                    />
                </el-form-item>
                <el-form-item prop="description" label="角色说明">
                    <el-input
                        v-model="roleForm.description"
                        type="textarea"
                        class="inputWidth"
                    />
                </el-form-item>
                <el-form-item size="mini" label="菜单授权">
                    <div>
                        <el-tree
                            ref="menuListTree"
                            :data="menulist"
                            :props="menuListTreeProps"
                            node-key="id"
                            show-checkbox
                        />
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <div class="custom-drawer-footer">
            <div class="flex-row" style="justify-content: space-between">
                <el-button type="text" @click="addEditDialog = false">取消</el-button>
                <div>
                    <el-button type="primary" class="form-submit" @click="addSubmit('roleForm')">
                        保存
                    </el-button>
                </div>
            </div>
        </div>
    </el-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { addRole, editeRole } from 'api/basePage/role'
import { roleMenuTree } from 'api/basePage/menu'
import { filterNotExistent } from '@/utils/utils'

export default {
    name: 'RoleAddEdit',

    components: {},

    computed: {
        ...mapState('dict', ['menulist'])
    },

    data() {
        return {
            title: '新增',
            addEditDialog: false,
            loading: false,

            roleForm: {
                id: '',
                name: '',
                internal: false,
                description: '',
                entryId: []
            },
            roleRules: {
                name: [
                    {
                        required: true,
                        message: '请输入角色名称',
                        trigger: ['blur', 'change']
                    }
                ]
            },
            menuListTreeProps: {
                label: 'title',
                children: 'children'
            },

            assignMenus: []
        }
    },

    mounted() {
        if (this.menulist.length == 0) {
            this.getMenuList()
        }
    },

    methods: {
        ...mapActions('dict', ['getMenuList']),

        add() {
            this.addEditDialog = true
            this.$nextTick(() => {
                (this.roleForm = {
                    id: '',
                    name: '',
                    description: '',
                    entryId: []
                }),
                this.$refs.menuListTree.setCheckedKeys([])
            })
        },
        edit(record) {
            this.addEditDialog = true
            this.$nextTick(() => {
                this.roleForm = JSON.parse(JSON.stringify(record))
                this.getRoleMenuTree()
                // this.$refs.roleForm.validateField('name')
            })
        },

        /**
		 * 获取已分配的菜单
		 */
        getRoleMenuTree() {
            roleMenuTree({
                roleId: this.roleForm.id
            })
                .then(res => {
                    this.roleForm.entryId = res.data

                    let resdata = res.data
                    let tempArry = []
                    tempArry.push(0)
                    tempArry.concat(resdata)
                    // console.log(tempArry);

                    let temp = {
                        id: 0,
                        children: this.menulist
                    }

                    let notExistent = filterNotExistent(
                        temp,
                        'id',
                        'children',
                        tempArry,
                        [],
                        'down'
                    )

                    var set = new Set(notExistent)
                    notExistent = Array.from(set)
                    if (notExistent.length > 0) {
                        notExistent.forEach(item => {
                            var index = resdata.findIndex(id => id === item)
                            if (index > -1) {
                                resdata.splice(index, 1)
                            }
                        })
                    }
                    this.$refs.menuListTree.setCheckedKeys(resdata)
                })
                .catch(() => {})
        },

        addSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.roleForm.entryId = [].concat(
                        this.$refs.menuListTree.getHalfCheckedKeys(),
                        this.$refs.menuListTree.getCheckedKeys()
                    )
                    console.log(this.roleForm)

                    if (this.roleForm.id) {
                        editeRole(this.roleForm)
                            .then(() => {
                                this.$notify.success({
                                    title: '成功',
                                    message: '修改角色成功'
                                })
                                this.addEditDialog = false
                                this.$emit('saveSuccess')
                            })
                            .catch(() => {
                                this.$notify.error({
                                    title: '错误',
                                    message: '修改角色失败'
                                })
                            })
                    } else {
                        // 新增
                        addRole(this.roleForm)
                            .then(() => {
                                this.$notify.success({
                                    title: '成功',
                                    message: '添加角色成功'
                                })
                                this.addEditDialog = false
                                this.$emit('saveSuccess')
                            })
                            .catch(() => {
                                this.$notify.error({
                                    title: '错误',
                                    message: '添加角色失败'
                                })
                            })
                    }
                } else {
                    return false
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped></style>
