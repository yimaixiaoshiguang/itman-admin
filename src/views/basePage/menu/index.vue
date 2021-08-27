<template>
	<div >
		<el-button type="primary" round @click="handleAdd" class="mb15" v-has="'sys:entry:add'">
			新增
		</el-button>

		<el-table ref="mvkTable"
			:data="menulist"
			row-key="id"
			:tree-props="{children: 'children', hasChildren: 'hasChildren'}"
			border>
			<el-table-column label="菜单名称" prop="title"></el-table-column>
			<el-table-column label="菜单图标" prop="icon" width="80" align="center">
				<template slot-scope="{row}">
					<icon-svg :icon="row.icon" size="24"></icon-svg>
				</template>
			</el-table-column>
			<el-table-column label="菜单类型" width="100">
				<template slot-scope="{row}">
					<el-tag :type="tagClass[row.type]">{{typeList[row.type]}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="是否左侧菜单" width="120">
				<template slot-scope="{row}">
					<el-switch v-model="row.isShow" disabled v-if="row.type != 2">
					</el-switch>
					<span v-else></span>
				</template>
			</el-table-column>
			<el-table-column label="打开方式" prop="isOpen" width="100">
				<template slot-scope="{row}">
					{{row.isOpen ? '内部打开':'外部打开'}}
				</template>
			</el-table-column>
			<el-table-column label="排序" prop="sort" width="50" align="center"></el-table-column>
			<el-table-column label="菜单路径" prop="path"></el-table-column>
			<el-table-column label="菜单组件" prop="component"></el-table-column>
			<el-table-column label="授权标识" prop="perms"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="{row}">
					<el-button type="text" size="small" @click="handleAddChild(row)" v-if="row.type != 2" v-has="'sys:entry:add'">新增</el-button>
					<el-button type="text" size="small" @click="handleEdit(row)" v-has="'sys:entry:edit'">编辑</el-button>
                    <delete-button buttonType="text" size="small" @delete="handleDelete" :id="row.id" v-has="'sys:entry:delete'">删除</delete-button>
				</template>
			</el-table-column>
		</el-table>

		<add-edit-dialog ref="modalForm" @saveSuccess="handleAddOrEditSave"></add-edit-dialog>
	</div>
</template>

<script>
	import {menuList, addMenu, deleteMenu, editeMenu, moveMenu} from 'api/basePage/menu.js'

	import {listMixin} from 'views/mixin/listMixin'

	import { mapState, mapActions } from 'vuex'

	export default {
        name:'MenuIndex',
        components: {
			'add-edit-dialog':()=>import('./addEdit.vue')
        },
		mixins:[listMixin],
        data(){
            return {
				filterText: '',
				menuTree:[],
				tagClass:['','success','warning'],
				typeList:['目录', '菜单', '按钮'],

				defaultProps: {
					children: 'children',
					label: 'title'
				},
				menuForm:{
					id:'',
					name:'',
					title:'',
					parentId:13,
					path:'',
					type:0,
					component:'',
					icon:'',
				},
				menuRules:{
					name: [{
					    required: true,
					    message: "请输入菜单英文名",
					    trigger: "blur"
					}],
					title: [{
					    required: true,
					    message: "请输入菜单中文名",
					    trigger: "blur"
					}],
					path: [{
					    required: true,
					    message: "请输入菜单访问路径",
					    trigger: "blur"
					}],
					component: [{
					    required: true,
					    message: "请输入菜单文件路径",
					    trigger: "blur"
					}]
				},
				menuFormItem:[
					// {prop:'parentId',label:'父菜单ID',disabled:true},
					{prop:'name',label:'菜单Name',placeholder:'请输入菜单的英文名'},
					{prop:'title',label:'菜单Title',placeholder:'请输入菜单的中文名'},
					{prop:'path',label:'路径',placeholder:'请输入菜单的访问路径'},
					{prop:'component',label:'菜单Component',placeholder:'请输入菜单的文件路径'},
					{prop:'icon',label:'菜单图标',placeholder:'请输入菜单的图标名称'},
				],

				addOrEdit:'add',//add:新增，edit:修改

				moveMenuForm:{//菜单拖拽传给后台的参数
					'entryId':'',
					'parentId':'',
				}
            }
        },
        computed:{
			...mapState('dict',['menulist'])
        },
		watch: {
		    filterText(val) {
		        this.$refs.tree.filter(val);
		    }
		},
        methods:{
			...mapActions('dict',['getMenuList']),

			handleAddOrEditSave(){
				this.getMenuList()
			},

			handleDetail(row, column){
				if(column.formatter){
					return column.formatter(row,column,row[column.prop])
				}else {
					return row[column.prop]
				}
			},

			handleAdd(){
				this.handleEdit({
					id: '',
					type: 0,
					name: '',
					title:'',
					parentId: 0,
					parentName:'',
					path: '',
					component:'Layout',
					perms: '',
					icon: '',
					isOpen:true,
					isShow:true,
					sort:this.menulist.length,
				})
			},

			handleAddChild(row){
				this.handleEdit({
					id: '',
					type: 1,
					name: '',
					title:'',
					parentId: row.id,
					parentName: row.title,
					path: '',
					component:'',
					perms: '',
					icon: '',
					isOpen:true,
					isShow:true,
					sort:row.children.length + 1,
				})
			},

			/**
			 * 菜单快速过滤
			 */
			filterNode(value, data) {
				if (!value) return true;
				return data.title.indexOf(value) !== -1;
			},
			/**
			 * 菜单拖拽,改变层级关系
			 */
			handleDrop(draggingNode, dropNode, dropType, ev){
				this.moveMenuForm.entryId = draggingNode.data.id

				if(dropType == 'inner') {
					this.moveMenuForm.parentId = dropNode.data.id
				}else {
					this.moveMenuForm.parentId = dropNode.parent.data.id
				}

				this.handleMoveMenu()
			},
			/**
			 * 保证菜单树只有一个根节点，根节点不允许拖拽
			 */
			allowDrop(draggingNode, dropNode, type){
				if(dropNode.data.id == '13'){
					// if(type == 'prev'){
					// 	this.$notify.warning({title:'不允许拖拽到根节点前面'})
					// }
					return type !== 'prev'
				}
				return true

			},


			handleCommand(command){
				let key = command.key
				switch (key){
					case 'add':
						//新增菜单
						this.addOrEdit = key
						this.$refs['menuForm'].resetFields();
						this.menuForm.parentId = command.data
						break;
					case 'edit':
						//编辑菜单
						this.$refs.tree.setCurrentKey(command.data.id)
						this.addOrEdit = key
						this.menuForm = JSON.parse(JSON.stringify(command.data))
						break;
					case 'delete':
						//删除菜单
						this.handleDelete(command.data)
						break
					default:
						break;
				}
				// console.log(command)
			},

			/**
			 * 菜单拖拽保存
			 */
			handleMoveMenu(){
				moveMenu(this.moveMenuForm).then(res => {
					this.$notify.success({
						title: '修改菜单成功'
					});
				}).catch(err => {
					this.$notify.error({
						title: '修改菜单失败'
					});
				})
			},

			/**
			 * 保存处理
			 */
			addSubmit(formName){
				this.$refs[formName].validate((valid) => {
				    if (valid) {
						if(this.addOrEdit == 'add'){
							// this.handleAdd()
						}else {
							this.handleEdit()
						}
					}else{
						return false
					}
				})
			},

			/**
			 * 新增菜单
			 */
			// handleAdd(){
			// 	addMenu(this.menuForm).then(res => {
			// 		console.log(res)
			// 		this.$notify.success({
			// 			title: '添加菜单成功'
			// 		});

			// 		this.getList()

			// 	}).catch(err => {
			// 		this.$notify.error({
			// 			title: '添加菜单失败'
			// 		});
			// 	})
			// },
			/**
			 * 修改菜单
			 */
			// handleEdit(){
			// 	editeMenu(this.menuForm).then(res => {
			// 		this.$notify.success({
			// 			title: '修改菜单信息成功'
			// 		});

			// 		this.getList()

			// 	}).catch(err => {
			// 		this.$notify.error({
			// 			title: '修改菜单信息失败'
			// 		});
			// 	})
			// },

			/**
			 * 删除菜单
			 */
			handleDelete(data){
				deleteMenu(data.id).then(res => {
					this.$notify.success({
						title: '删除菜单成功'
					});
					this.getMenuList()
				}).catch(err => {
					this.$notify.error({
						title: '删除菜单失败'
					});
				})
			},
        },
        mounted(){
			if(this.menulist.length == 0){
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
