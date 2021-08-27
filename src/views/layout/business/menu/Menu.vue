<template>
    <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        :router="true"
        mode="vertical"
    >
        <menu-item v-for="route in routes" :key="route.path" :index="(route.path)" :menu="route"></menu-item>
    </el-menu>
    
</template>

<script>
/**
 * 菜单白名单
 */
const routerWhiteList = ['/','/dashboard']

export default {
    name: 'Menu',
    components: {  
        'menu-item':()=>import('./MenuItem')
    },
    computed: {  
        isCollapse() {
			return !this.$store.state.app.sidebar.opened;
		},

        activeMenu() {
			const route = this.$route;
			const { meta, path } = route;
			if (meta.activeMenu) {
				return meta.activeMenu;
			}
			return path;
		},

        routes() {
            // console.log(this.$router.options.routes);
            //取可访问路由，若是从后台获取的路由，应该改成permission.routers
            const sysRouters = this.$router.options.routes

            //过滤白名单中的菜单
			return sysRouters.filter(item => {
                return routerWhiteList.indexOf(item.path) == -1
            })
		},
    },
    data() {
        return {
            
        };
    },
    mounted() {
        
    },
    methods: {
        
    },
};
</script>

<style lang="scss" scoped>

</style>