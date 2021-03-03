<template>
	<div :class="classObj" class="app-wrapper">
		<div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
		
		<sidebar class="sidebar-container" />
		
		<div :class="{hasTagsView:needTagsView}" class="main-container">
			<div :class="{ 'fixed-header': fixedHeader }">
				<navbar />
				<tags-view v-if="needTagsView" />
			</div>
			<app-main />
		</div>
	</div>

</template>

<script>
	import { Navbar, Sidebar, AppMain, TagsView } from './components';
	import ResizeMixin from './mixin/ResizeHandler';

	export default {
		name: 'Layout',
		components: {
			Navbar,
			Sidebar,
			AppMain,
			TagsView,
		},
		data() {
			return {
				
			}
		},
		mixins: [ResizeMixin],
		computed: {
			sidebar() {
				return this.$store.state.app.sidebar;
			},
			device() {
				return this.$store.state.app.device;
			},
			fixedHeader() {
				return this.$store.state.settings.fixedHeader;
			},
			needTagsView() {
				return this.$store.state.settings.tagsView;
			},
			classObj() {
				return {
					hideSidebar: !this.sidebar.opened,
					openSidebar: this.sidebar.opened,
					withoutAnimation: this.sidebar.withoutAnimation,
					mobile: this.device === 'mobile'
				};
			},
		},
		methods: {
			handleClickOutside() {
				this.$store.dispatch('app/closeSideBar', {
					withoutAnimation: false
				});
			},
		}
	};
</script>

<style lang="scss" scoped>
	.el-divider {
		background-color: #00c9ff;
	}
</style>