<template>
	<div class="header-user">
	    <span class="header-user-item">
	        <icon-svg icon="yonghu" size="20" style="margin: -3px 6px;"></icon-svg>
	        <span>{{name}}</span>
	    </span>
	    <el-divider direction="vertical"></el-divider>
	    <span class="header-user-item" @click="logout">
	        <icon-svg icon="tuichu" size="20" style="margin:-3px 6px;" title="退出系统"></icon-svg>
	        退出系统
	    </span>
	</div>
</template>

<script>
	export default {
        name:'',
        components: {
        },
        data(){
            return {
				name:'admin'
            }
        },
        computed:{
        },
        methods:{
            
        },
        mounted(){
        }
        
    }
</script>

<style lang="scss" scoped>
</style>
