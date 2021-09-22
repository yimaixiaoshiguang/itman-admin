<template>
    <div>
        <div
            v-has="'sys:role:add'"
            style="display: flex; justify-content: space-between; margin-bottom: 15px"
        >
            <el-button type="primary" round @click="handleAdd"> 新增 </el-button>
        </div>

        <mvk-table ref="mvkTable" :table-column="tableColumn" :table-data-func="tableDataFunc">
            <!--自定义操作-->
            <el-table-column label="操作">
                <template slot-scope="{ row }">
                    <el-button
                        v-has="'sys:role:edit'"
                        type="text"
                        size="small"
                        @click="handleEdit(row)"
                    >
                        编辑
                    </el-button>
                    <delete-button
                        v-if="!row.internal"
                        :id="row.id"
                        v-has="'sys:role:delete'"
                        button-type="text"
                        size="small"
                        @delete="handleDelete"
                    >
                        删除
                    </delete-button>
                </template>
            </el-table-column>
        </mvk-table>

        <!--新增修改-->
        <add-edit-dialog ref="modalForm" @saveSuccess="handleAddOrEditSave" />
    </div>
</template>

<script>
import { roleList, deleteRole } from 'api/basePage/role.js'

import { listMixin } from 'views/mixin/listMixin'

export default {
    components: {
        'add-edit-dialog': () => import('./addEdit.vue')
    },
    mixins: [listMixin],
    data() {
        return {
            tableColumn: [
                {
                    prop: 'name',
                    label: '名称'
                },
                {
                    prop: 'description',
                    label: '说明'
                },
                {
                    prop: 'internal',
                    label: '类型',
                    formatter: (row, column, cellValue) => {
                        if (cellValue) {
                            return '系统预定义'
                        } else {
                            return '自定义'
                        }
                    }
                }
            ],

            tableDataFunc: parameter => {
                return roleList(parameter).then(res => {
                    return res.data
                })
            },

            addRoleDialog: false,

            menuDrawer: false,
            drawerTitle: '',
            currentRoleId: '', // 当前操作的roleId

            userDrawer: false,
            wareDrawer: false
        }
    },

    methods: {
        handleDelete(data) {
            let roleId = data.id
            deleteRole(roleId)
                .then(() => {
                    this.$notify.success({
                        title: '删除成功'
                    })
                    this.$refs.mvkTable.refresh()
                })
                .catch(() => {
                    this.$notify.error({
                        title: '删除失败'
                    })
                })
        },

        /**
		 * 菜单分配
		 */
        assignMenu(data) {
            this.menuDrawer = true
            this.drawerTitle = data.name
            this.currentRoleId = data.id
        },

        assignMenuSuccess() {
            this.menuDrawer = false
            this.$refs.menuDraw.closeDrawer()
        },

        /**
		 * 用户分配
		 */
        assignUser(data) {
            this.userDrawer = true
            this.drawerTitle = data.name
            this.currentRoleId = data.id
        },

        assignUserSuccess() {
            this.userDrawer = false
            this.$refs.userDraw.closeDrawer()
        },

        handleAddOrEditSave() {
            this.$refs.mvkTable.refresh()
        }
    },
    mounted() {}
}
</script>

<style lang="scss" scoped></style>
