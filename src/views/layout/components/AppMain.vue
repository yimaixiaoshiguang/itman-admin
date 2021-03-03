<template>
	<section class="app-main">
		<breadcrumb class="breadcrumb-container" />
		<transition name="fade-transform" mode="out-in">
			<router-view :key="key" />
		</transition>
	</section>
</template>

<script>
	import { mapState} from 'vuex';
	import Breadcrumb from '@/components/Breadcrumb';
	
	export default {
		name: 'AppMain',
		components:{
			Breadcrumb
		},
		computed: {
			key() {
				return this.$route.path;
			}
		}
	};
</script>

<style lang="scss">
	// fix css style bug in open el-dialog
	.el-popup-parent--hidden {
		.fixed-header {
			padding-right: 15px;
		}
	}
	
	
</style>