<template>
    <div class="mvk-layout-sider" :class="siderClass">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'msider',
    props: {  
        siderTheme:{
            type:String,
            default:''
        },
        siderCollapse:{
            type:Boolean,
            dafault:false
        },
        siderFixed:{
            type:Boolean,
            default:false
        },
    },
    computed: {

        siderClass(){
            return {
                'mvk-layout-sider-collapse':this.siderCollapse,
                'mvk-layout-sider-dark':this.siderTheme == 'dark',
                'mvk-layout-sider-fixed':this.siderFixed
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

<style lang="scss">
    


	
</style>