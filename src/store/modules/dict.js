
import { menuList } from 'api/basePage/menu'
import { roleList } from 'api/basePage/role'

const state = {
	shoplist: [],
	supplierlist: [],
	menulist: [],//菜单列表
	rolelist: [],//角色列表
	tablelist: [],//可配置表列表
}

const mutations = {
	GET_SHOPLIST:(state,list) => {
		state.shoplist = list
	},

	GET_SUPPLIERLIST: (state, list) => {
		state.supplierlist = list
	},

	GET_MENULLIST: (state, list) => {
		state.menulist = list
	},

	GET_ROLELIST: (state, list) => {
		state.rolelist = list
	},

	GET_TABLELIST: (state, list) => {
		state.tablelist = list
	}
}

const actions = {

	//菜单列表
	getMenuList({
		commit
	}) {
		return new Promise((resolve, reject) => {
			menuList().then(res => {
				commit('GET_MENULLIST',res.data)
				resolve(res.data)
            }).catch(err => {
				reject(err);
		    })
		})
	},

	//角色列表
	getRoleList({
		commit
	}) {
		return new Promise((resolve, reject) => {
			roleList({
                pageNum:0,
				pageSize:1000,
			}).then(res => {
				commit('GET_ROLELIST',res.data.list)
				resolve(res.data)
            }).catch(err => {
				reject(err);
		    })
		})
	},


	getTableList({
		commit
	}) {
		return new Promise((resolve, reject) => {
			permissionTableList().then(res => {
				commit('GET_TABLELIST',res)
				resolve(res)
            }).catch(err => {
				reject(err);
		    })
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
