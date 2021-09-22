import axios from 'axios'
import { MessageBox } from 'element-ui'
import {
    getToken,
    setToken
} from 'api/auth'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 创建axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // api的base_url
    timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
    NProgress.start()
    if (getToken() && getToken() != 'null') {
        config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
}, error => {
    return Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(function(response) {
    NProgress.done()
    // 对响应数据做点什么
    if (response.status == '200') {
        if (response.data && response.data.token) {
            setToken(response.data.token)
        }

        return response.data

        // if (response.data.code == 200) {

        // }else {
        // 	if(response.data.data){
        // 		MessageBox.alert(response.data.data.message || response.data.data,'提示');
        // 	}else {
        // 		MessageBox.alert(response.data.message,'提示');
        // 	}
        // }

    } else {
        var message = response.message
        if (message == '') {
            switch (response.status) {
                case 400:
                    message = response.data.message || '错误请求'
                    break
                case 401:
                    message = response.data.message || '未授权，请重新登录'
                    // setTimeout(() => {
                    // 	removeToken()
                    // 	router.push('/')
                    // },100)
                    break
                case 403:
                    message = response.data.message || '拒绝访问'
                    break
                case 404:
                    message = response.data.message || '请求错误,未找到该资源'
                    break
                case 405:
                    message = response.data.message || '请求方法未允许'
                    break
                case 408:
                    message = response.data.message || '请求超时'
                    break
                case 500:
                    message = response.data.message || '服务器端出错'
                    break
                case 501:
                    message = response.data.message || '网络未实现'
                    break
                case 502:
                    message = response.data.message || '网络错误'
                    break
                case 503:
                    message = response.data.message || '服务不可用'
                    break
                case 504:
                    message = response.data.message || '网络超时'
                    break
                case 505:
                    message = response.data.message || 'http版本不支持该请求'
                    break
                default:
                    message = response.data.message || '连接到服务器失败'
            }
        }

        MessageBox.alert(message, '提示')
    }
}, function(error) {
    NProgress.done()
    // 错误的请求结果处理，这里的代码根据后台的状态码来决定错误的输出信息
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = error.response.data.message || '错误请求'
                break
            case 401:
                error.message = error.response.data.message || '未授权，请重新登录'
                // setTimeout(() => {
                // 	removeToken()
                // 	router.push('/')
                // },100)
                break
            case 403:
                error.message = error.response.data.message || '拒绝访问'
                break
            case 404:
                error.message = error.response.data.message || '请求错误,未找到该资源'
                break
            case 405:
                error.message = error.response.data.message || '请求方法未允许'
                break
            case 408:
                error.message = error.response.data.message || '请求超时'
                break
            case 500:
                error.message = error.response.data.message || '服务器端出错'
                break
            case 501:
                error.message = error.response.data.message || '网络未实现'
                break
            case 502:
                error.message = error.response.data.message || '网络错误'
                break
            case 503:
                error.message = error.response.data.message || '服务不可用'
                break
            case 504:
                error.message = error.response.data.message || '网络超时'
                break
            case 505:
                error.message = error.response.data.message || 'http版本不支持该请求'
                break
            default:
                error.message = `连接错误${error.response.status}`
        }
    } else {
        error.message = '连接到服务器失败'
    }

    MessageBox.alert(error.message, '提示')
    return Promise.reject(error)
})

export default service
