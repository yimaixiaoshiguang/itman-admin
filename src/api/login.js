import fetch from '@/axios/fetch'

export function login(data) {//登录
	return fetch({
	    url:'/login',
	    method: 'post',
	    data
	});
}

export function logout(data) {//退出
  return fetch({
    url: '/common/user/authentication',
    method: 'DELETE',
    data
  })
}


