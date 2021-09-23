<template>
    <el-drawer :title="title" :visible.sync="addEditDialog" size="50%">
        <el-form
            ref="dataForm"
            :model="dataForm"
            :rules="dataRule"
            label-width="100px"
            style="width: 80%"
            class="mod-menu"
            @keyup.enter.native="dataFormSubmit()"
        >
            <el-form-item label="菜单类型" prop="type">
                <el-radio-group
                    v-model="dataForm.type"
                    :disabled="!!dataForm.id"
                    @change="changeMenuType"
                >
                    <el-radio v-for="(type, index) in typeList" :key="index" :label="index">
                        {{
                            type
                        }}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="英文名称" prop="name">
                <mvk-input v-model.trim="dataForm.name" placeholder="英文名称" />
            </el-form-item>
            <el-form-item label="中文名称" prop="title">
                <mvk-input v-model.trim="dataForm.title" placeholder="中文名称" />
            </el-form-item>
            <el-form-item
                v-show="dataForm.type != 0"
                label="上级菜单"
                prop="parentName"
                :rules="dataForm.type != 0 ? dataRule.parentName : [{ required: false }]"
            >
                <el-popover ref="menuListPopover" placement="bottom-start" trigger="click">
                    <el-tree
                        ref="menuListTree"
                        :data="menulist"
                        :props="menuListTreeProps"
                        node-key="id"
                        clearable
                        :highlight-current="true"
                        :expand-on-click-node="false"
                        @current-change="menuListTreeCurrentChangeHandle"
                    />
                </el-popover>
                <el-input
                    v-model="dataForm.parentName"
                    v-popover:menuListPopover
                    :readonly="true"
                    placeholder="点击选择上级菜单"
                    class="menu-list__input"
                />
            </el-form-item>
            <el-form-item
                v-show="dataForm.type != 2"
                label="菜单URL"
                prop="path"
                :rules="dataForm.type != 2 ? dataRule.path : [{ required: false }]"
            >
                <el-input v-model="dataForm.path" placeholder="菜单URL" />
            </el-form-item>
            <el-form-item
                v-show="dataForm.type != 2"
                label="前端组件"
                prop="component"
                :rules="dataForm.type != 2 ? dataRule.component : [{ required: false }]"
            >
                <el-input v-model="dataForm.component" placeholder="前端组件" />
            </el-form-item>
            <el-form-item v-show="dataForm.type != 2" label="是否路由菜单" prop="isShow">
                <el-radio-group v-model="dataForm.isShow">
                    <el-radio :label="true">
                        是
                    </el-radio>
                    <el-radio :label="false">
                        否
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-show="dataForm.type != 2" label="打开方式" prop="isOpen">
                <el-radio-group v-model="dataForm.isOpen">
                    <el-radio :label="true">
                        内部打开
                    </el-radio>
                    <el-radio :label="false">
                        外部打开
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-show="dataForm.type !== 0" label="授权标识" prop="perms">
                <el-input
                    v-model="dataForm.perms"
                    placeholder="多个用逗号分隔, 如: user:list,user:create"
                />
            </el-form-item>
            <el-form-item label="排序号" prop="orderNum">
                <el-input-number
                    v-model="dataForm.sort"
                    controls-position="right"
                    :min="0"
                    label="排序号"
                />
            </el-form-item>
            <el-form-item v-show="dataForm.type !== 2" label="菜单图标" prop="icon">
                <el-row>
                    <el-col :span="22">
                        <el-popover
                            ref="iconListPopover"
                            trigger="click"
                            popper-class="mod-menu__icon-popover"
                        >
                            <div class="mod-menu__icon-inner">
                                <div class="mod-menu__icon-list">
                                    <el-button
                                        v-for="(item, index) in iconList"
                                        :key="index"
                                        :class="{ 'is-active': item === dataForm.icon }"
                                        @click="iconActiveHandle(item)"
                                    >
                                        <icon-svg :icon="item" size="18" />
                                    </el-button>
                                </div>
                            </div>
                        </el-popover>
                        <el-input
                            v-model="dataForm.icon"
                            v-popover:iconListPopover
                            :readonly="true"
                            placeholder="菜单图标名称"
                            class="icon-list__input"
                        />
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSubmit('dataForm')">
                    保存
                </el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script>
import { iconList } from '@/utils/constants'

import { addMenu, editMenu } from 'api/basePage/menu'

import { mapState, mapActions } from 'vuex'
import { treeToList } from '@/utils/utils'

export default {
    name: 'MenuAddEdit',

    components: {},

    computed: {
        ...mapState('dict', ['menulist']),

        menuTreeList() {
            return treeToList(this.menulist, [])
        }
    },
    data() {
        return {
            title: '新增',
            addEditDialog: false,
            loading: false,

            dataForm: {
                id: '',
                type: 1,
                name: '',
                title: '',
                parentId: 0,
                parentName: '',
                path: '',
                component: '',
                perms: '',
                icon: '',
                isOpen: true,
                isShow: true,
                sort: 0
            },
            typeList: ['目录', '菜单', '按钮'],
            iconList: iconList,
            dataRule: {
                type: [{ required: true, message: '请选择菜单类型', trigger: 'change' }],
                name: [{ required: true, message: '请输入英文名称', trigger: 'blur' }],
                title: [{ required: true, message: '请输入中文名称', trigger: 'blur' }],
                parentName: [{ required: true, message: '上级菜单不能为空', trigger: 'change' }],
                path: [{ required: true, message: '菜单URL不能为空', trigger: 'blur' }],
                component: [{ required: true, message: '前端组件不能为空', trigger: 'blur' }]
            },
            menuList: [],
            menuListTreeProps: {
                label: 'title',
                children: 'children'
            }
        }
    },

    mounted() {},

    methods: {
        ...mapActions('dict', ['getMenuList']),

        add() {
            this.addEditDialog = true
            this.$nextTick(() => {
                this.$refs['dataForm'].resetFields()
            })
            this.getMenuTree()
        },
        edit(record) {
            this.addEditDialog = true
            this.$nextTick(() => {
                this.dataForm = JSON.parse(JSON.stringify(record))

                if (this.dataForm.parentId != 0 && !this.dataForm.parentName) {
                    this.dataForm.parentName = this.menuTreeList.filter(
                        item => item.id == this.dataForm.parentId
                    )[0].title
                }
            })
            this.getMenuTree()
        },

        getMenuTree() {
            if (this.menulist.length == 0) {
                this.getMenuList()
            }
        },
        // 当切换为菜单类型为目录时
        changeMenuType(val) {
            if (val == 0) {
                this.dataForm.parentId = 0
                this.dataForm.parentName = ''
            } else if (val == 2) {
                this.dataForm.isShow = false
            }
        },

        // 菜单树选中
        menuListTreeCurrentChangeHandle(data) {
            this.dataForm.parentId = data.id
            this.dataForm.parentName = data.title
        },

        // 图标选中
        iconActiveHandle(iconName) {
            this.dataForm.icon = iconName
        },

        handleSubmit(formName) {
            // 按钮时，清空component,path,
            if (this.dataForm.type == 2) {
                this.dataForm.component = ''
                this.dataForm.path = ''
            } else {
                // 目录，菜单时，清空授权标识
                this.dataForm.perms = ''
            }
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.dataForm.id
                        ? editMenu(this.dataForm)
                            .then(() => {
                                this.$notify.success({
                                    title: '成功',
                                    message: '编辑成功'
                                })
                                this.loading = false
                                this.addEditDialog = false
                                this.$emit('saveSuccess')
                            })
                            .catch(() => {
                                this.loading = false
                            })
                        : addMenu(this.dataForm)
                            .then(() => {
                                this.loading = false
                                this.$notify.success({
                                    title: '成功',
                                    message: '添加成功'
                                })
                                this.addEditDialog = false
                                this.$emit('saveSuccess')
                            })
                            .catch(() => {
                                this.loading = false
                            })
                } else {
                    return false
                }
            })
        }
    }
}
</script>

<style lang="scss">
.mod-menu {
	.menu-list__input,
	.icon-list__input {
		> .el-input__inner {
			cursor: pointer;
		}
	}
	&__icon-popover {
		width: 458px;
		overflow: hidden;
	}
	&__icon-inner {
		width: 478px;
		max-height: 258px;
		overflow-x: hidden;
		overflow-y: auto;
	}
	&__icon-list {
		width: 458px;
		padding: 0;
		margin: -8px 0 0 -8px;
		> .el-button {
			padding: 8px;
			margin: 8px 0 0 8px;
			> span {
				display: inline-block;
				vertical-align: middle;
				width: 18px;
				height: 18px;
				font-size: 18px;
			}
		}
	}
	.icon-list__tips {
		font-size: 18px;
		text-align: center;
		color: #e6a23c;
		cursor: pointer;
	}
}
.mod-menu__icon-inner {
	.svg-icon {
		margin-right: 0;
	}
}
</style>
