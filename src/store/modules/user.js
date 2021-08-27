import {getToken, setToken, removeToken, getRefreshToken, setRefreshToken, getExpires, setExpires, removeAllSessionItem} from 'api/auth';
import {login, logout} from 'api/login'
import {userMenuTree, btnPermission} from 'api/basePage/menu'
import { Notification } from 'element-ui';
import router, { resetRouter } from '@/router'
import store from '@/store';


const user = {
	namespaced: true,
	state: {
		username:'admin',
		userId:'',
		roleId:'',
		roles: '',
		token: getToken(),//当前token
		refresh_token:getRefreshToken(),//刷新token
		expiration:getExpires(),//token到期时间
		menuRouter: {},//后台返回菜单路由
		btnLimit:[],//按钮权限
	},
	mutations: {
		SET_USERNAME: (state, name) => {
			state.username = name;
			sessionStorage.setItem('eshop-username',name);
		},
		SET_USERID: (state, id) => {
			state.userId = id;
			sessionStorage.setItem('eshop-userId',id);
		},
		SET_ROLEID: (state, id) => {
			state.roleId = id;
		},
		SET_ROLES: (state, roles) => {
		    state.roles = roles;
		    sessionStorage.setItem('eshop-role',roles);
		},
		SET_TOKEN: (state, token) => {
			state.token = token;
			setToken(token);
		},
		SET_MENUROUTER:(state,routers) => {
			state.menuRouter = routers;
			sessionStorage.setItem('eshop-menu',routers);
		},
		SET_BTNLIMIT: (state, list) => {
			state.btnLimit = list
			sessionStorage.setItem('eshop-btnLimit',list);
		}
	},
	actions: {
		//登录
		LoginByUserName({
			commit,
			dispatch,
		}, userInfo) {
//			console.log(value.sysKey);
			commit('SET_TOKEN', '');
			removeToken();
			return new Promise((resolve, reject) => {
				//有接口之后调用接口，获取返回路由
				login(userInfo).then(res => {
					console.log(res);
					commit('SET_TOKEN', res.token);
					// commit('SET_USERID',res.data.userId)
					commit('SET_USERNAME',res.data.username)
					//从后台获取登录账户的路由
					// let accessedRoutes = dispatch('getUserMenuTree')

					//不是从后台获取，直接读取本地配置的异步路由
					let accessedRoutes = dispatch('permission/generateRoutes',{},{ root: true });

					//获取按钮权限
					dispatch('getBtnPermission')

					resolve(accessedRoutes);
				}).catch(err => {
				 	reject(err);
				})

				// demo形式，直接读取本地配置的路由（二选一）
				// let accessedRoutes = dispatch('permission/generateRoutes', {}, { root: true });
				// resolve(accessedRoutes);

			});
		},

		//获取登录用户的菜单树，并动态添加到路由中
		getUserMenuTree({
			state,
			dispatch,
			commit,
			rootGetters
		}, userId) {
			return new Promise((resolve, reject) => {
				userMenuTree().then(res => {
					let data = res.data;

					if(data != null){
						//保存后台返回的菜单
						commit('SET_MENUROUTER',JSON.stringify(data));


						//获取该用户可以访问的路由
						dispatch('permission/addRoutesByValue', data, { root: true });

						resolve(data || []);
					}else {
						// Notification.error({title:'该账户没有可操作菜单'})

					}

				}).catch(err => {
				 	reject(err);
				})
			});
		},

		getBtnPermission({
			commit
		}) {
			return new Promise((resolve, reject) => {
				btnPermission().then(res => {
					let data = res.data;

					if(data != null){
						//保存后台返回的菜单
						commit('SET_BTNLIMIT',JSON.stringify(data));

						resolve(data || []);
					}else {
						// Notification.error({title:'该账户没有可操作菜单'})
					}

				}).catch(err => {
				 	reject(err);
				})
			});
		},

		// 退出登出
		LogOut({
			dispatch
		}) {
			return new Promise((resolve, reject) => {
				removeAllSessionItem();
				resetRouter();

				dispatch('tagsView/delAllVisitedViews', {}, { root: true })
				dispatch('tagsView/delAllCachedViews', {}, { root: true })

				resolve();
			});
		},
	}
}

export default user;
