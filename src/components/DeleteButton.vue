<template>
	<el-popover placement="top" width="160" v-model="visible">
		<p>确定删除？</p>
		<div style="text-align: right; margin: 0">
			<el-button size="mini" type="text" @click="visible = false">取消</el-button>
			<el-button type="primary" size="mini" @click="submit">确定</el-button>
		</div>
		<icon-svg slot="reference" icon="delete" size="16" title="删除"></icon-svg>
	</el-popover>
</template>

<script>
	export default {
		name: '',
		components: {},
		data() {
			return {
				visible:false
			}
		},
		computed: {},
		methods: {
			submit(){
				this.visible = false
				
				this.$emit('delete',this.$attrs)
			}
		},
		mounted() {}

	}
</script>

<style lang="scss" scoped>
</style>
