<template>
	<div class="sidebar-logo-container" :class="{ collapse: collapse }">
		<transition name="sidebarLogoFade">
			<div v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
				<img v-if="logo" :src="logo" class="sidebar-logo" />
				<h1 v-else class="sidebar-title">{{ title }}</h1>
			</div>
			<div v-else key="expand" class="sidebar-logo-link" to="/">
				<img v-if="logo" :src="logo" class="sidebar-logo" />
				<h1 class="sidebar-title">{{ title }}</h1>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		name: 'SidebarLogo',
		props: {
			collapse: {
				type: Boolean,
				required: true
			}
		},
		data() {
			return {
			};
		},
		computed: {
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
	.sidebarLogoFade-enter-active {
		transition: opacity 1.5s;
	}
	
	.sidebarLogoFade-enter,
	.sidebarLogoFade-leave-to {
		opacity: 0;
	}
	
	.sidebar-logo-container {
		position: relative;
		width: 100%;
		height: 60px;
		line-height: 60px;
		background: #212225;
		padding: 0 20px;
		overflow: hidden;
		& .sidebar-logo-link {
			height: 100%;
			width: 100%;
			& .sidebar-logo {
				width: 32px;
				height: 32px;
				vertical-align: middle;
				margin-right: 12px;
			}
			& .sidebar-title {
				display: inline-block;
				margin: 0;
				color: #fff;
				font-weight: 400;
				line-height: 56px;
				font-size: 18px;
				font-family: '微软雅黑';
				vertical-align: middle;
			}
		}
		&.collapse {
			padding: 0;
			text-align: center;
			.sidebar-logo {
				margin-right: 0px;
			}
		}
	}
	
	// /deep/ .router-link-active {
	//     background-color: transparent;
	// }
</style>