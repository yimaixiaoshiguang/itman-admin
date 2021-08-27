<template>
    <!--多层级菜单-->
    <el-submenu :index="(menu.path)" v-if="menu.children && menu.children.length > 1">
        <template slot="title">
            <icon-svg :icon="menu.meta.icon" size="24" style="vertical-align: middle;" v-if="menu.meta && menu.meta.icon"/>
            <span slot="title">{{menu.meta && menu.meta.title}}</span>
        </template>
        <menu-item v-for="childMenu in menu.children" :key="childMenu.path" :menu="childMenu"></menu-item>
    </el-submenu>
    <!--只有一个child的菜单，直接显示child-->
    <el-menu-item :index="(menu.children[0].path)" v-else-if="menu.children && menu.children.length == 1">
        <icon-svg :icon="menu.children[0].meta.icon" size="24" style="vertical-align: middle;" v-if="menu.children[0].meta && menu.children[0].meta.icon"/>
        <span slot="title">{{menu.children[0].meta && menu.children[0].meta.title}}</span>
    </el-menu-item>
    <el-menu-item :index="(menu.path)" v-else>
        <icon-svg :icon="menu.meta.icon" size="24" style="vertical-align: middle;" v-if="menu.meta && menu.meta.icon"/>
        <span slot="title">{{menu.meta && menu.meta.title}}</span>
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