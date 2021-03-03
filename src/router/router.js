import sysBaseRouter from './modules/basePage.js'  //后台管理系统的基本页面：用户管理，角色管理，菜单管理

export const constantRoutes = [
	{
		path: '/',
		name: 'login',
		component: () => import('views/login'),
	},
	
	sysBaseRouter
]


export const asyncRoutes = [
]