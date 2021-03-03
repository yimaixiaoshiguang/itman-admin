import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import '@/assets/scss/index.scss' // global css

//icon
import './assets/iconfont/iconfont';
import IconSvg from './components/Icon-svg';
Vue.component('icon-svg', IconSvg)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
