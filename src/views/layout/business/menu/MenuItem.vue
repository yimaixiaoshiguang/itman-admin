<template>
    <!--多层级菜单-->
    <span v-if="menu.children && menu.children.length > 0">
        <template v-if="routerWhiteList.indexOf(menu.path) > -1">
            <el-menu-item :index="(menu.children[0].path)">
                <icon-svg v-if="menu.children[0].meta && menu.children[0].meta.icon" :icon="menu.children[0].meta.icon" size="24" style="vertical-align: middle;" />
                <span slot="title">{{ menu.children[0].meta && menu.children[0].meta.title }}</span>
            </el-menu-item>
        </template>
        <el-submenu v-else :index="(menu.path)">
            <template slot="title">
                <icon-svg v-if="menu.meta && menu.meta.icon" :icon="menu.meta.icon" size="24" style="vertical-align: middle;" />
                <span slot="title" :class="{'no-icon':menu.meta && !menu.meta.icon}">{{ menu.meta && menu.meta.title }}</span>
            </template>
            <template v-for="childMenu in menu.children">
                <menu-item v-if="!childMenu.hidden" :key="childMenu.path" :menu="childMenu" />
            </template>

        </el-submenu>
    </span>
    <!--只有一个child的菜单，直接显示child-->
    <!-- <el-menu-item :index="(menu.children[0].path)" v-else-if="menu.children && menu.children.length == 1 && !menu.children[0].hidden">
        <icon-svg :icon="menu.children[0].meta.icon" size="24" style="vertical-align: middle;" v-if="menu.children[0].meta && menu.children[0].meta.icon"/>
        <span slot="title">{{menu.children[0].meta && menu.children[0].meta.title}}</span>
    </el-menu-item> -->
    <el-menu-item v-else :index="(menu.path)">
        <icon-svg v-if="menu.meta && menu.meta.icon" :icon="menu.meta.icon" size="24" style="vertical-align: middle;" />
        <span slot="title" :class="{'no-icon':menu.meta && !menu.meta.icon}">{{ menu.meta && menu.meta.title }}</span>
    </el-menu-item>
</template>

<script>
export default {
    name: 'MenuItem',
    props: {
        // menu object
        menu: {
            type: Object,
            required: true
        }
    },
    components: {  },
    directives: {  },
    data() {
        return {
            routerWhiteList: ['/dashboard']// 只有一个child的菜单，直接显示child 特殊处理
        }
    },
    mounted() {

    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
    .no-icon {
        margin-left: 12px;
    }
    .el-menu--collapse span[slot='title'] {
        display: none;
    }
</style>
