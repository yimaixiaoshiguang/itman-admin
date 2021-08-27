<template>
    <div class="mvk-layout-header" :class="headerClass">
        <slot></slot>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'AppHeader',
    components: {  },
    // props:{
    //     headerTheme:{
    //         type:String,
    //         default:''
    //     },
    //     siderCollapse:{
    //         type:Boolean,
    //         dafault:false
    //     },
    //     headerFixed:{
    //         type:Boolean,
    //         dafault:false
    //     },
    //     headerStick:{
    //         type:Boolean,
    //         dafault:false
    //     },
    // },
    computed: {  
        ...mapState('settings',['headerTheme','headerFixed','headerStick']),
        
        siderCollapse() {
            return !this.$store.state.app.sidebar.opened;
        },

        headerClass(){
            return {
                'mvk-layout-header-dark':this.headerTheme == 'dark',
                'mvk-layout-header-primary':this.headerTheme == 'primary',
                'mvk-layout-header-fixed':this.headerFixed,
                'mvk-layout-header-sider-collapse':this.siderCollapse,
                'mvk-layout-header-stick':this.headerFixed && this.headerStick,
            }
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