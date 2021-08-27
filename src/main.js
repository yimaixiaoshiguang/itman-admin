import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission'

require ('./mock/index')

import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/scss/element-ui/element-variables.scss'
Vue.use(ElementUI,{ size: 'small' });

import '@/assets/scss/index.scss' // global css

import '@/components/components'


import {formatTime} from './utils/validate'
Vue.filter('formatTime',function(time){
  if(!time){
    return ''
  }
  return formatTime(time);
})

import { deteleModal } from '@/libs/public'
Vue.prototype.$deteleModal = deteleModal

//按钮权限
Vue.directive('has', {
	inserted: (el, binding) => {
		// console.log(binding.value);
        let permissionList = sessionStorage.getItem('eshop-btnLimit');
        if (!permissionList.includes(binding.value)) {
            el.parentNode.removeChild(el)
        }
    }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
