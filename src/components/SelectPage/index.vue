<template>
	<el-select v-bind="$attrs" v-on="$listeners">
		<el-option
			v-for="(item,index) in listData"
			:key="index"
			:label="item.label"
			:value="item.value">
		</el-option>
		<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page.sync="pageNum"
			:page-size="pageSize"
			background
			layout="total, prev, pager, next"
			:total="total">
		</el-pagination>
	</el-select>
</template>

<script>
	//带有分页的select下拉框
	export default {
		name: 'SelectPage',
		props:{
			listDataFunc:{//下拉框的数据接口
				type: Function,
				required: true
			},
		},
		computed: {
			params(){
				return {
					pageNum:this.pageNum - 1,
					pageSize:this.pageSize
				}
			}
		},
		data() {
			return {
				loading:false,

				listData:[],//下拉框列表数据

				pageNum: 1,
				pageSize: 10,
				total: 0,
			};
		},
		created() {
			this.loadData()
		},

		mounted() {

		},

		methods: {
			refresh(){
				this.pageNum = 1;
				this.loadData()
			},

			//加载下拉框数据接口，获得返回数据
			loadData(){
				this.loading = true
				let dataPromise = this.listDataFunc(this.params)

				dataPromise.then( res =>{
					// console.log(res);
					this.listData = res.list || res.content
					this.total = res.totalElements
				}).finally(()=>{
					this.loading = false
				})
			},

			//每页显示个数
			handleSizeChange(val) {
				this.pageSize = val;
				this.pageNum = 1;
				this.loadData();
			},
			//当前页变化
			handleCurrentChange(val) {
				this.pageNum = val;
				this.loadData();
			},
		},
	};
</script>

<style lang="scss" scoped>

</style>
