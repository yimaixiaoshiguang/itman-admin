<template>
    <el-scrollbar>
        <el-menu
            class="mvk-menu"
            :default-active="activeMenu"
            :collapse="isCollapse"
            :unique-opened="true"
            :collapse-transition="false"
            :router="true"
            mode="vertical"
        >
            <menu-item v-for="route in menuRoutes" :key="route.path" :index="(route.path)" :menu="route" />
        </el-menu>
    </el-scrollbar>
</template>

<script>
import { mapState } from 'vuex'
/**
 * 菜单白名单
 */
const routerWhiteList = []

export default {
    name: 'Menu',
    components: {
        'menu-item': () => import('./MenuItem')
    },
    computed: {
        ...mapState('permission', ['routes']),

        isCollapse() {
            return !this.$store.state.app.sidebar.opened
        },

        activeMenu() {
            const route = this.$route
            const { meta, path } = route
            if (meta.activeMenu) {
                return meta.activeMenu
            }
            return path
        },

        menuRoutes() {
            // console.log(this.$router.options.routes);
            // console.log(this.routes);
            // 取可访问路由，若是从后台获取的路由，应该改成permission.routers
            // const sysRouters = this.$router.options.routes
            const sysRouters = this.routes

            // 过滤白名单中的菜单
            return sysRouters.filter(item => {
                return routerWhiteList.indexOf(item.path) == -1 && !item.hidden
            })
        }
    },
    data() {
        return {

        }
    },
    mounted() {

    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
</style>
