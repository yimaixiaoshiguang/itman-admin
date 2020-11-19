import fetch from '@/axios/fetch'

export function login(data) {//登录
	return fetch[0]({
	    url:'/common/user/authentication',
	    method: 'PUT',
	    data
	});
}