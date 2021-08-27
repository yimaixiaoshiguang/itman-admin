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

export function refreshToken(data) {//刷新令牌，登录续期
  return fetch({
    url: '/login/refresh',
    method: 'post',
    data
  })
}

export function sendCode(params) {//发送验证码
	return fetch({
	    url:'/user/sendCode',
	    method: 'get',
	    params
	});
}
