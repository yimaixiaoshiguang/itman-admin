import { asyncRoutes, constantRoutes } from '@/router/router'
import router, { resetRouter } from '@/router'
import Layout from '@/views/layout/index'
import SubLayout from '@/views/layout/subIndex'

/**
 * 把后台返回菜单组装成routes要求的格式
 * @param {*} routes
 */

const activeMenu = {
	'createProduct':'/selfManager/goodManager',
	'seckillProduct': '/marketingManager/seckill/list',
	'couponListAdd': '/marketingManager/coupon/list'
}

export function getAsyncRoutes(routes) {
	const res = []
	const keys = ['path', 'name', 'children', 'redirect', 'alwaysShow', 'meta', 'hidden','head']
	routes.forEach(item => {
	    const newItem = {}
	    if (item.component) {
			if (item.component === 'Layout') {
				newItem.component = Layout
			} else if (item.component === 'SubLayout') {
				newItem.component = SubLayout
			} else {
//	        	newItem.component = resolve => require([`@/${item.component}`],resolve)
				let temp = item.component
				newItem.component = () => {
					return Promise.resolve(require(`@/views/${temp}`).default)
				}
	      	}
	    }

	    for (const key in item) {
	      	if (keys.includes(key)) {
	        	newItem[key] = item[key]
	      	}
	    }

		//由于后台返回的数据没有meta，故封装meta
		newItem.meta = {
			title:item.title,
			icon: item.icon,
		}

		if (activeMenu.hasOwnProperty(item.name)) {
			newItem.meta.activeMenu = activeMenu[item.name]
		}

		newItem.hidden = !item.isShow

	    if (newItem.children && newItem.children.length > 0) {
	      	newItem.children = getAsyncRoutes(item.children)
	    }
	    res.push(newItem)
	})
	return res
}


const state = {
	routes: [],
	addRoutes: []
}

const mutations = {
	SET_ROUTES: (state, routes) => {
		state.addRoutes = routes
		state.routes = constantRoutes.concat(routes)
	}
}

const actions = {
	//直接读取本地的异步路由
	generateRoutes({
		state,
		commit
	}) {
		return new Promise(resolve => {
			resetRouter();

			commit('SET_ROUTES', asyncRoutes);
			router.addRoutes(asyncRoutes)
			resolve(state.routes)
		})
	},

	//后台返回的路由装载
	addRoutesByValue({
		commit
	},routers){
		return new Promise(resolve => {
			resetRouter();
//			console.log(routers);
			let accessedRoutes = getAsyncRoutes(routers);
			// console.log(accessedRoutes);
			commit('SET_ROUTES', accessedRoutes);
			router.addRoutes(accessedRoutes)

			resolve(accessedRoutes)
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
