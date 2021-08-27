import sysBaseRouter from './modules/basePage.js'  //后台管理系统的基本页面：用户管理，角色管理，菜单管理

export const constantRoutes = [
	{
		path: '/',
		name: 'login',
		component: () => import('views/login'),
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		meta: {
			title: '首页',
			affix:true
		},
		component: () => import('views/layout/index'),
	},

	{
		path: '/setting',
		name: 'setting',
		meta: {
			title: '系统设置',
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
	
	sysBaseRouter
]


export const asyncRoutes = [
]