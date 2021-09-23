<template>
    <div>
        <el-button
            v-has="'sys:entry:add'"
            type="primary"
            round
            class="mb15"
            @click="handleAdd"
        >
            新增
        </el-button>

        <el-table
            ref="mvkTable"
            :data="menulist"
            row-key="id"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            border
        >
            <el-table-column label="菜单名称" prop="title" />
            <el-table-column label="菜单图标" prop="icon" width="80" align="center">
                <template slot-scope="{ row }">
                    <icon-svg :icon="row.icon" size="24" />
                </template>
            </el-table-column>
            <el-table-column label="菜单类型" width="100">
                <template slot-scope="{ row }">
                    <el-tag :type="tagClass[row.type]">
                        {{ typeList[row.type] }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="是否左侧菜单" width="120">
                <template slot-scope="{ row }">
                    <el-switch v-if="row.type != 2" v-model="row.isShow" disabled />
                    <span v-else />
                </template>
            </el-table-column>
            <el-table-column label="打开方式" prop="isOpen" width="100">
                <template slot-scope="{ row }">
                    {{ row.isOpen ? "内部打开" : "外部打开" }}
                </template>
            </el-table-column>
            <el-table-column label="排序" prop="sort" width="50" align="center" />
            <el-table-column label="菜单路径" prop="path" />
            <el-table-column label="菜单组件" prop="component" />
            <el-table-column label="授权标识" prop="perms" />
            <el-table-column label="操作">
                <template slot-scope="{ row }">
                    <el-button
                        v-if="row.type != 2"
                        v-has="'sys:entry:add'"
                        type="text"
                        size="small"
                        @click="handleAddChild(row)"
                    >
                        新增
                    </el-button>
                    <el-button
                        v-has="'sys:entry:edit'"
                        type="text"
                        size="small"
                        @click="handleEdit(row)"
                    >
                        编辑
                    </el-button>
                    <delete-button
                        :id="row.id"
                        v-has="'sys:entry:delete'"
                        button-type="text"
                        size="small"
                        @delete="handleDelete"
                    >
                        删除
                    </delete-button>
                </template>
            </el-table-column>
        </el-table>

        <add-edit-dialog ref="modalForm" @saveSuccess="handleAddOrEditSave" />
    </div>
</template>

<script>
import { deleteMenu } from 'api/basePage/menu.js'

import { listMixin } from 'views/mixin/listMixin'

import { mapState, mapActions } from 'vuex'

export default {
    name: 'MenuIndex',
    components: {
        'add-edit-dialog': () => import('./addEdit.vue')
    },
    mixins: [listMixin],
    data() {
        return {
            filterText: '',
            menuTree: [],
            tagClass: ['', 'success', 'warning'],
            typeList: ['目录', '菜单', '按钮'],

            defaultProps: {
                children: 'children',
                label: 'title'
            },
            menuForm: {
                id: '',
                name: '',
                title: '',
                parentId: 13,
                path: '',
                type: 0,
                component: '',
                icon: ''
            },
            menuRules: {
                name: [
                    {
                        required: true,
                        message: '请输入菜单英文名',
                        trigger: 'blur'
                    }
                ],
                title: [
                    {
                        required: true,
                        message: '请输入菜单中文名',
                        trigger: 'blur'
                    }
                ],
                path: [
                    {
                        required: true,
                        message: '请输入菜单访问路径',
                        trigger: 'blur'
                    }
                ],
                component: [
                    {
                        required: true,
                        message: '请输入菜单文件路径',
                        trigger: 'blur'
                    }
                ]
            },
            menuFormItem: [
                // {prop:'parentId',label:'父菜单ID',disabled:true},
                { prop: 'name', label: '菜单Name', placeholder: '请输入菜单的英文名' },
                { prop: 'title', label: '菜单Title', placeholder: '请输入菜单的中文名' },
                { prop: 'path', label: '路径', placeholder: '请输入菜单的访问路径' },
                {
                    prop: 'component',
                    label: '菜单Component',
                    placeholder: '请输入菜单的文件路径'
                },
                { prop: 'icon', label: '菜单图标', placeholder: '请输入菜单的图标名称' }
            ],

            addOrEdit: 'add', // add:新增，edit:修改

            moveMenuForm: {
                // 菜单拖拽传给后台的参数
                entryId: '',
                parentId: ''
            }
        }
    },
    computed: {
        ...mapState('dict', ['menulist'])
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val)
        }
    },
    methods: {
        ...mapActions('dict', ['getMenuList']),

        handleAddOrEditSave() {
            this.getMenuList()
        },

        handleDetail(row, column) {
            if (column.formatter) {
                return column.formatter(row, column, row[column.prop])
            } else {
                return row[column.prop]
            }
        },

        handleAdd() {
            this.handleEdit({
                id: '',
                type: 0,
                name: '',
                title: '',
                parentId: 0,
                parentName: '',
                path: '',
                component: 'Layout',
                perms: '',
                icon: '',
                isOpen: true,
                isShow: true,
                sort: this.menulist.length
            })
        },

        handleAddChild(row) {
            this.handleEdit({
                id: '',
                type: 1,
                name: '',
                title: '',
                parentId: row.id,
                parentName: row.title,
                path: '',
                component: '',
                perms: '',
                icon: '',
                isOpen: true,
                isShow: true,
                sort: row.children.length + 1
            })
        },

        /**
		 * 删除菜单
		 */
        handleDelete(data) {
            deleteMenu(data.id)
                .then(() => {
                    this.$notify.success({
                        title: '删除菜单成功'
                    })
                    this.getMenuList()
                })
                .catch(() => {
                    this.$notify.error({
                        title: '删除菜单失败'
                    })
                })
        }
    },
    mounted() {
        if (this.menulist.length == 0) {
            this.getMenuList()
        }
    }
}
</script>

<style lang="scss" scoped>
::v-deep .el-tree-node__content {
	cursor: move;
}
</style>
