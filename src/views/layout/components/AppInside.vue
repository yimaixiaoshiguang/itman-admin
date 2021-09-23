<template>
    <el-container class="mvk-layout-inside" :class="insideClass">
        <slot />
    </el-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'AppInside',
    // props: {  
    //     siderFixed:{
    //         type:Boolean,
    //         default:false
    //     },
    //     siderCollapse:{
    //         type:Boolean,
    //         dafault:false
    //     }
    // },
    computed: {  
        ...mapState('settings', ['siderFixed']),

        siderCollapse() {
            return !this.$store.state.app.sidebar.opened
        },

        insideClass() {
            return {
                'mvk-layout-inside-sider-fixed': this.siderFixed,
                'mvk-layout-inside-sider-fixed-collapse': this.siderFixed && this.siderCollapse
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

<style lang="scss" scoped>

</style>