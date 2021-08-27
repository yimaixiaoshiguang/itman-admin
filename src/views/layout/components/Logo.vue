<template>
	<div class="mvk-sider-logo-container" :class="{ collapse: collapse }">
		<transition name="siderLogoFade">
			<div v-if="collapse" key="collapse" class="sider-logo-link" to="/">
				<img v-if="logo" :src="logo" class="sider-logo" />
				<h1 v-else class="sider-title">新零售交易平台</h1>
			</div>
			<div v-else key="expand" class="sider-logo-link" to="/">
				<img v-if="logo" :src="logo" class="sider-logo" />
				<h1 class="sider-title">新零售交易平台</h1>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		name: 'SiderLogo',
		// props: {
		// 	collapse: {
		// 		type: Boolean,
		// 		required: true
		// 	}
		// },
		data() {
			return {
			};
		},
		computed: {
			collapse() {
				return !this.$store.state.app.sidebar.opened;
			},

			title() {
				return this.$store.state.settings.title
			},
			logo() {
				return this.$store.state.settings.logo
			}
		},
	};
</script>

<style lang="scss" scoped>
	
	
	// /deep/ .router-link-active {
	//     background-color: transparent;
	// }
</style>