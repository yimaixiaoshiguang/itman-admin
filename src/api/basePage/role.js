import fetch from '@/axios/fetch'

export function roleList(data) {//角色列表
	return fetch({
	    url:'/role',
	    method: 'get',
		params:data
	});
}

export function addRole(RoleInfo) {//新增角色
	return fetch({
	    url:'/role',
	    method: 'post',
		data:RoleInfo
	});
}

export function deleteRole(RoleId) {//删除角色
	return fetch({
	    url:'/role/'+RoleId,
	    method: 'delete',
	});
}

export function searchRole(RoleId) {//角色搜索
	return fetch({
	    url:'/role/'+RoleId,
	    method: 'get',
	});
}

export function editeRole(RoleInfo) {//修改角色信息
	return fetch({
	    url:'/role',
	    method: 'put',
		data:RoleInfo
	});
}


export function assignAccount(assignUser) {//批量分配账户角色
	return fetch({
	    url:'/role/account',
	    method: 'put',
		data:assignUser
	});
}

export function assignMenu(assignMenu) {//批量分配菜单
	return fetch({
	    url:'/role/entry',
	    method: 'put',
		data:assignMenu
	});
}