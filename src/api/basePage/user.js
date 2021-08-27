import fetch from '@/axios/fetch'

export function userList(data) {//用户列表
	return fetch({
	    url:'/user',
	    method: 'get',
		params:data
	});
}

export function addUser(userInfo) {//新增用户
	return fetch({
	    url:'/user',
	    method: 'post',
		data:userInfo
	});
}

export function deleteUser(userId) {//删除用户
	return fetch({
	    url:'/user/'+userId,
	    method: 'delete',
	});
}

export function searchUser(userId) {//用户搜索
	return fetch({
	    url:'/user/'+userId,
	    method: 'get',
	});
}

export function editeUser(userInfo) {//修改用户信息
	return fetch({
	    url:'/user',
	    method: 'put',
		data:userInfo
	});
}

export function resetPW(passwordInfo) {//修改密码
	return fetch({
	    url:'/user/reset',
	    method: 'put',
		data:passwordInfo
	});
}

export function assignUserList(roleId) {//根据角色id获取已分配用户
	return fetch({
	    url:'/user/role',
	    method: 'get',
		params:roleId
	});
}

export function personalInfo() {
	return fetch({
	    url:'/user/user_info',
	    method: 'get',
	});
}
