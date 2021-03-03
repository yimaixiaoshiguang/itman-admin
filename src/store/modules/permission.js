import { asyncRoutes, constantRoutes } from '@/router/router'
import router, { resetRouter } from '@/router'
import Layout from '@/views/layout'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(role, route) {
	if(route.meta && route.meta.roles) {
		return route.meta.roles.includes(role)
	} else {
		return true
	}
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, role) {
	const res = []

	routes.forEach(route => {
		const tmp = { ...route
		}
		
		if(hasPermission(role, tmp)) {
			if(tmp.children) {
				tmp.children = filterAsyncRoutes(tmp.children, role)
			}
			res.push(tmp)
		}
	})
	return res
}

/**
 * 把后台返回菜单组装成routes要求的格式
 * @param {*} routes
 */
export function getAsyncRoutes(routes) {
	const res = []
	const keys = ['path', 'name', 'children', 'redirect', 'alwaysShow', 'meta', 'hidden','head']
	routes.forEach(item => {
	    const newItem = {}
	    if (item.component) {
	      	if (item.component === '@/views/layout') {
	        	newItem.component = Layout
	      	} else {
//	        	newItem.component = resolve => require([`@/${item.component}`],resolve)
				let temp = item.component
				newItem.component = () => {
					return Promise.resolve(require(`@/views/${temp}`).default)
				}
	      	}
	    }
	    if (item.hidden) {
	    	if(item.hidden == 'false'){
	    		item.hidden = false;
	    	}else {
	    		item.hidden = true;
	    	}
	    }
	    for (const key in item) {
	      	if (keys.includes(key)) {
	        	newItem[key] = item[key]
	      	}
	    }
	    if (newItem.children && newItem.children.length > 0) {
	      	newItem.children = getAsyncRoutes(item.children[0])
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
	generateRoutes({
		state,
		commit
	}, roles) {
		return new Promise(resolve => {
			let accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
//			console.log(accessedRoutes);
//			if(roles.includes('admin')) {
//				accessedRoutes = asyncRoutes || []
//			} else {
//				accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
//			}
//			router.addRoutes(accessedRoutes)
			commit('SET_ROUTES', accessedRoutes);
//			router.options.routes = state.routes;
			resolve()
		})
	},
	
	addOtherRoutes({
		commit
	},sysKey){
		return new Promise(resolve => {
			let otherRoute = otherRoutes.filter(item => {
				return item.name == sysKey
			});//根据sysKey取对应的系统路由
			
//			console.log(otherRoute);
			
			resetRouter();
			//根据角色过滤匹配的子路由
			let accessedRoutes = filterAsyncRoutes(otherRoute, sessionStorage.getItem('cpms-role'));
//			console.log(accessedRoutes);
			commit('SET_ROUTES', accessedRoutes);
			router.addRoutes(accessedRoutes)
			
			//设置头部title
			const title = otherRoute[0].meta.title;
			commit('app/SET_TITLE',title, { root: true });
			
			resolve(otherRoute)
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
			console.log(accessedRoutes);
			commit('SET_ROUTES', accessedRoutes);
			router.addRoutes(accessedRoutes)
			
			//设置头部title
			const title = routers[0].meta.title;
			commit('app/SET_TITLE',title, { root: true });
			
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