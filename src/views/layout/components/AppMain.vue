<template>
	<el-card :body-style="{padding:'15px'}">
		<transition name="fade-transform" mode="out-in">
			<router-view :key="key" />
		</transition>
	</el-card>
</template>

<script>
	export default {
		name: 'AppMain',
		components:{
		},
		computed: {
			key() {
				return this.$route.path;
			}
		}
	};
</script>

<style lang="scss" scope>
</style>
