<template>
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
				Copyright © 2021 广东美物纪数字技术有限公司
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
		},
		methods: {
			
		}
	};
</script>

<style lang="scss" scoped>
</style>