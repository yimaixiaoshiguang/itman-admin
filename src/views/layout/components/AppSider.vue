<template>
    <div class="mvk-layout-sider" :class="siderClass">
        <slot />
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'AppSider',
    // props: {  
    //     siderTheme:{
    //         type:String,
    //         default:''
    //     },
    //     siderCollapse:{
    //         type:Boolean,
    //         dafault:false
    //     },
    //     siderFixed:{
    //         type:Boolean,
    //         default:false
    //     },
    // },
    computed: {
        ...mapState('settings', ['siderFixed', 'siderTheme']),
        
        siderCollapse() {
            return !this.$store.state.app.sidebar.opened
        },

        siderClass() {
            return {
                'mvk-layout-sider-collapse': this.siderCollapse,
                'mvk-layout-sider-dark': this.siderTheme == 'dark',
                'mvk-layout-sider-fixed': this.siderFixed
            }
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

<style lang="scss">

</style>