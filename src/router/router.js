/**
 * hidden:true;不显示在菜单栏
 * meta:{
 * 		title  //页签中的名字
 * 		icon   //左侧菜单栏的图标
 * 		affix  //页签是否固定
 * 		activeMenu  //关联菜单高亮
 * }
 */
import sysBaseRouter from './modules/basePage.js'  //后台管理系统的基本页面：用户管理，角色管理，菜单管理

export const constantRoutes = [
	{
		path: '/',
		meta: {
			show:false
		},
		name: 'login',
		component: () => import('views/login'),
		hidden:true,
	},
	{
		path: '/dashboard',
		redirect:'/dashboard/index',
		component: () => import('views/layout/index'),
		children: [
			{
				path: '/dashboard/index',
				name: 'dashboardIndex',
				meta: {
					title: '首页',
					icon:'shouye',
					affix:true
				},
				component: () => import('views/dashboard/index'),
			}
		]
	},
	{
		path: '/personal',
		component: () => import('views/layout/index'),
		hidden:true,
		children: [
			{
				path: '/personal/info',
				name: 'personalInfo',
				meta: {
					title: '个人信息',
				},
				component: () => import('views/personal'),
				hidden:true
			}
		]
	},
	{
		path: '/reset',
		component: () => import('views/layout/index'),
		hidden:true,
		children: [
			{
				path: '/reset/password',
				name: 'resetPassword',
				meta: {
					title: '重设密码',
				},
				component: () => import('views/basePage/user/resetPw'),
				hidden:true
			}
		]
	},
	{
		path: '/404',
		component: () => import('views/layout/index'),
		hidden:true,
		children: [
			{
				path: '/error404',
				name: '404',
				meta: {
					title: '404',
				},
				component: () => import('views/error/404'),
				hidden:true
			}
		]
	},
	{
		path: '/setting',
		name: 'setting',
		meta: {
			title: '系统设置',
			icon:'sys'
		},
		component: () => import('views/layout/index'),
		children: [
			{
				path: '/setting/index',
				name: 'settingIndex',
				meta: {
					title: '设置',
				},
				component: () => import('views/setting/index'),
			}
		]
	},
]


export const asyncRoutes = [
	sysBaseRouter,
]
