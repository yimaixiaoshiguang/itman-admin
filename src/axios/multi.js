import axios from 'axios'
import { MessageBox } from 'element-ui'
import store from 'store/index'
import {
	getToken,
	setToken,
	removeToken
} from 'api/auth'

// 创建axios多实例
const instance1 = axios.create({
	baseURL: process.env.VUE_APP_BASE_API, // api的base_url
	timeout: 5000 // 请求超时时间
});

const instance2 = axios.create({
	baseURL: process.env.VUE_APP_BASE_API, // api的base_url
	timeout: 5000 // 请求超时时间
});

let request = [instance1,instance2]


for(let i = 0;i<request.length;i++){
    request[i].interceptors.request.use(requestInterceptor, error => {
      return Promise.reject(error)
    })
    request[i].interceptors.response.use(responseInterceptor, ErrorInterceptor)
}


// request拦截器
const requestInterceptor = (config) => {
	if(getToken()) {
		// 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
		config.headers['token'] = getToken()
	}
	return config
}



// respone拦截器
const responseInterceptor = (response) => {
	// 对响应数据做点什么
	if(response.status == '200') {
		if(response.data.code == 200){
			return response.data
		}else {
			if(response.data.data){
				MessageBox.alert(response.data.data.message || response.data.data,'提示')
			}else {
				MessageBox.alert(response.data.message,'提示')
			}
		}
		
	} else {
		var message = response.message;
		if(message == '') {
			switch(response.status) {
				case 400:
					message = '错误请求'
					break
				case 401:
					message = '未授权，请重新登录'
					break
				case 403:
					message = '拒绝访问'
					break
				case 404:
					message = '请求错误,未找到该资源'
					break
				case 405:
					message = '请求方法未允许'
					break
				case 408:
					message = '请求超时'
					break
				case 500:
					message = '服务器端出错'
					break
				case 501:
					message = '网络未实现'
					break
				case 502:
					message = '网络错误'
					break
				case 503:
					message = '服务不可用'
					break
				case 504:
					message = '网络超时'
					break
				case 505:
					message = 'http版本不支持该请求'
					break
				default:
					message = '连接到服务器失败'
			}
		}

		MessageBox.alert(message, '提示');
	}
}

//error message 拦截器
const ErrorInterceptor = (error) => {
	// 错误的请求结果处理，这里的代码根据后台的状态码来决定错误的输出信息
	if(error && error.response) {
		switch(error.response.status) {
			case 400:
				error.message = '错误请求'
				break
			case 401:
				error.message = '未授权，请重新登录'
				break
			case 403:
				error.message = '拒绝访问'
				break
			case 404:
				error.message = '请求错误,未找到该资源'
				break
			case 405:
				error.message = '请求方法未允许'
				break
			case 408:
				error.message = '请求超时'
				break
			case 500:
				error.message = '服务器端出错'
				break
			case 501:
				error.message = '网络未实现'
				break
			case 502:
				error.message = '网络错误'
				break
			case 503:
				error.message = '服务不可用'
				break
			case 504:
				error.message = '网络超时'
				break
			case 505:
				error.message = 'http版本不支持该请求'
				break
			default:
				error.message = `连接错误${error.response.status}`
		}
	} else {
		error.message = "连接到服务器失败"
	}

	MessageBox.alert(error.message, '提示')
	return Promise.reject(error)
})

export default request