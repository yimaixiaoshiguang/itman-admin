<template>
	<!-- <div :class="classObj" class="app-wrapper">
		<div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
		
		
		
		<div :class="{hasTagsView:needTagsView}" class="main-container">
			<div :class="{ 'fixed-header': fixedHeader }">
				<navbar />
				<tags-view v-if="needTagsView" />
			</div>
			<app-main />
		</div>
	</div> -->
	<el-container class="mvk-layout">
		<app-sider>
			<logo />
			<Menu style="flex:1"/>
			<div>
				<hamburger v-if="hamburgerPosition == 'sidebar'"/>
			</div>
		</app-sider>
		
		<app-inside>
			<app-header>
				<logo v-if="headerStick"/>
				<navbar />
			</app-header>
			<div class="mvk-layout-content">
				<tags-view v-if="tagsView"/>

				<div class="mvk-layout-content-main">
					<app-main />
				</div>
			</div>
			<el-footer height="" class="mvk-footer">
				Footer content
			</el-footer>
		</app-inside>
	</el-container>
	
</template>

<script>
	// import {MMenu} from './menu.vue'
	import {AppHeader, AppSider, AppInside, Logo, AppMain, Navbar, Hamburger } from './components';
	import {Menu, TagsView} from './business'
	import ResizeMixin from './mixin/ResizeHandler';
	import { mapActions, mapState } from 'vuex'
	

	export default {
		name: 'Layout',
		components: {
			AppHeader,
			AppSider,
			AppInside,
			AppMain,
			Logo,
			Menu,
			TagsView,
			Navbar,
			Hamburger,
		},
		data() {
			return {
				
			}
		},
		mixins: [ResizeMixin],
		computed: {
			...mapState('settings',['headerStick','tagsView','hamburgerPosition']),

			siderCollapse() {
				return !this.$store.state.app.sidebar.opened;
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