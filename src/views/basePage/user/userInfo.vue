<template>
	<div>
		<div style="display: flex;justify-content:space-between;margin-bottom:15px;">
			<el-button type="primary" round @click="handleAdd">
				新增
			</el-button>
		</div>

		<mvk-table ref="mvkTable" :tableColumn="tableColumn" :tableDataFunc="tableDataFunc">
			<template slot-scope="{row}" slot="roleNames" label="用户角色">
				<!-- <template > -->
					<el-tag v-for="(item,index) in row.roleNames" :key="index">{{item}}</el-tag>
					<!-- <span v-else>111</span> -->
					<!-- {{row.roleNames}} -->
				<!-- </template> -->

			</template>
			<!--自定义操作-->
			<el-table-column label="操作">
				<template slot-scope="{row}">
					<el-button type="text" size="small" @click="handleEdit(row)" >编辑</el-button>
				</template>
			</el-table-column>
		</mvk-table>

		<el-drawer
		  :title="addOrEdit == 'add' ? '新增用户':'编辑用户'"
		  size="650px"
		  ref="userDraw"
		  :destroy-on-close = "true"
		  :visible.sync="userDrawer">
			<add-user :userInfo="currentUserInfo" :addOrEdit="addOrEdit"
				@submit="handleSubmit">
			</add-user>
		</el-drawer>
	</div>
</template>

<script>
	import {userList,editeUser,deleteUser,searchUser,addUser} from 'api/basePage/user.js'



	export default {
		components:{
			'add-user':()=>import('./addUser'),
		},
		data() {
			return {
				tableColumn:[
					{
						prop:'id',
						label:'ID',
					},
					{
						prop:'username',
						label:'用户账号',
					},
					{
						prop:'fullName',
						label:'用户名称',
					},
					{
						prop:'roleNames',
						label:'用户角色',
						slot:true
					},
					{
						prop:'mobile',
						label:'手机号码',
					},
					{
						prop:'email',
						label:'邮箱',
					}
				],

				// 查询条件参数
				queryParam:{},

				tableDataFunc:parameter => {
					return userList(Object.assign(parameter, this.queryParam))
						.then(res => {
							let temp = res.data.list
							temp.forEach(item => {
								item.roleNames = item.role.map(item => item.name)
							})
							return res.data
						})
				},

				editPwDialog:false,
				userId:'',

				addUserDialog:false,

				keyword:'',

				userDrawer:false,
				currentUserInfo:{},

				addOrEdit:'add',
			}
		},
		computed:{

		},
		methods: {
			/**
			 * 点击新增按钮
			 */
			handleAdd(){
				this.addOrEdit = 'add'
				this.userDrawer = true
			},

			/**
			 * 点击编辑按钮
			 */
			handleEdit(userItem){
				this.addOrEdit = 'edit'
				this.userDrawer = true
				this.currentUserInfo = JSON.parse(JSON.stringify(userItem))
			},

			handleSubmit(userInfo){
				if(this.addOrEdit == 'add'){
					this.handleAddUser(userInfo)
				}else {
					this.handleEditUser(userInfo)
				}
			},

			/**
			 * 调用新增用户接口
			 */
			handleAddUser(userInfo){
				addUser(userInfo).then(res => {
					// console.log(res)
					this.$notify.success({
						title: '添加用户成功'
					});
					this.addSuccess()
				}).catch(err => {
					this.$notify.error({
						title: '添加用户失败'
					});
				})
			},

			/**
			 * 调用修改用户接口
			 */
			handleEditUser(userInfo){
				editeUser(userInfo).then(res => {
					this.$notify.success({
						title: '修改成功'
					});
					this.addSuccess()
				}).catch(err => {
					this.$notify.error({
						title: '修改失败'
					});
				})
			},

			addSuccess(){
				this.$refs.userDraw.closeDrawer()
				this.userDrawer = false
				this.$refs.mvkTable.refresh()
			},
		},
		mounted() {
		}
	}

</script>

<style lang="scss" scoped>
</style>
