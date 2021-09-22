import Vue from 'vue'

// layout
// import msider from './Layout/msider.vue'
// Vue.component('msider', msider)
// import mheader from './Layout/mheader.vue'
// Vue.component('mheader', mheader)
// import minside from './Layout/minside.vue'
// Vue.component('minside',minside)

// icon
import '@/assets/iconfont/iconfont'
import IconSvg from './Icon-svg'
Vue.component('IconSvg', IconSvg)

import DeleteButton from './DeleteButton.vue'
Vue.component('DeleteButton', DeleteButton)

import CollapsePane from './CollapsePane.vue'
Vue.component('CollapsePane', CollapsePane)

import MvkTable from './Table/index'
Vue.component('MvkTable', MvkTable)

import MvkSelect from './SelectPage/index'
Vue.component('MvkSelectPage', MvkSelect)

import MvkInput from './Input/index'
Vue.component('MvkInput', MvkInput)
