import router from './router'
import store from './store';
import { getToken, removeAllSessionItem } from '@/api/auth';


let refresh = false;
let toRouter = null

router.beforeEach(async (to, from, next) => {
	toRouter = to

	// 判断是否已登陆
	if(getToken()){

		//页面刷新的情况，需要重新获取菜单
		if(from.name == null && !refresh){
			refresh = true;

			// store.dispatch('user/getUserMenuTree')

			// //获取按钮权限
			store.dispatch('user/getBtnPermission')

			//重新获取头部菜单以及对应的子菜单
			// var menuList = JSON.parse(sessionStorage.getItem('eshop-menu'));
			// //接口返回的菜单路由（二选一）
			// store.dispatch("permission/addRoutesByValue", menuList).then(() => {
			// 	if (toRouter.matched.length === 0) {
			// 		next('/error404')
			// 	} else {
			// 		next({...to})
			// 	}
			// });
			//直接读取本地路由（二选一）
			store.dispatch("permission/generateRoutes")

			next({...to})


		} else {
			if (toRouter.matched.length === 0) {
				next('/error404')
			} else {
				next()
			}
		}

	}else{
		if(to.path == '/'){
			removeAllSessionItem()
			next()
		} else {
			next('/')
		}
	}
})

router.afterEach(() => {
})



