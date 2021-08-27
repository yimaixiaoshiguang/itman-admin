import Vue from 'vue'

//layout
// import msider from './Layout/msider.vue'
// Vue.component('msider', msider)
// import mheader from './Layout/mheader.vue'
// Vue.component('mheader', mheader)
// import minside from './Layout/minside.vue'
// Vue.component('minside',minside)

//icon
import '@/assets/iconfont/iconfont';
import IconSvg from './Icon-svg';
Vue.component('icon-svg', IconSvg)

import DeleteButton from './DeleteButton.vue'
Vue.component('delete-button', DeleteButton)

import CollapsePane from './CollapsePane.vue'
Vue.component('collapse-pane', CollapsePane)

import splitPane from 'vue-splitpane'
Vue.component('split-pane',splitPane)
