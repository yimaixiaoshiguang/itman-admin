<template>
	<div class="navbar">
		<hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

		<logout />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import Hamburger from '@/components/Hamburger';
import logout from '@/views/components/logout';

export default {
	components: {
		Hamburger,
		logout
	},
	computed: {
		...mapGetters(['sidebar']),
	},
	methods: {
		toggleSideBar() {
			this.$store.dispatch('app/toggleSideBar');
		},
	}
};
</script>

<style lang="scss" scoped>
.navbar {
	height: 60px;
	overflow: hidden;
	position: relative;
	background: #212225;
	box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

	.hamburger-container {
		line-height: 56px;
		height: 100%;
		float: left;
		cursor: pointer;
		transition: background 0.3s;
		-webkit-tap-highlight-color: transparent;

		&:hover {
			background: rgba(255, 255, 255, 0.3);
		}
	}

	.breadcrumb-container {
		float: left;
	}
	
	&.navbar-imgbg {
		background: #000;
		
		// /deep/ .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
		// 	color: #c8c8c8;
		// }
		
		.hamburger-container {
			color: #000;
		}
	}
}
</style>
