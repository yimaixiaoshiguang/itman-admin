import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import { constantRoutes } from './router'

const createRouter = () => new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: constantRoutes
})

const router = createRouter()

// 清空router
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router