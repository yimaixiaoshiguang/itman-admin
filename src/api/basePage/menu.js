import fetch from '@/axios/fetch'

export function menuList() {//菜单列表
	return fetch({
	    url:'/entry/tree',
	    method: 'get',
	});
}

export function addMenu(data) {//新增菜单
	return fetch({
	    url:'/entry',
	    method: 'post',
		data
	});
}

export function deleteMenu(menuId) {//删除菜单
	return fetch({
	    url:'/entry/'+menuId,
	    method: 'delete',
	});
}

export function searchMenu(menuId) {//菜单搜索
	return fetch({
	    url:'/entry/'+menuId,
	    method: 'get',
	});
}

export function editMenu(data) {//修改菜单信息
	return fetch({
	    url:'/entry',
	    method: 'put',
		data
	});
}

export function moveMenu(menuInfo) {//拖拽菜单
	return fetch({
	    url:'/entry/move',
	    method: 'put',
		data:menuInfo
	});
}

export function roleMenuTree(roleId) {//通过角色id获取菜单树
	return fetch({
	    url:'/entry/role_entry',
	    method: 'get',
		params:roleId
	});
}

export function userMenuTree() {//获取用户拥有的菜单树
	return fetch({
	    url:'/entry/nav',
	    method: 'get',
	});
}

export function btnPermission() {//获取用户拥有的按钮权限
	return fetch({
	    url:'/entry/permissions',
	    method: 'get',
	});
}
