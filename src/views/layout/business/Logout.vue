<template>
	<div class="header-user">
	    <span class="header-user-item">
	        <icon-svg icon="yonghu" size="20" style="margin: -3px 6px;"></icon-svg>
	        <!-- <span>{{name}}</span> -->
	    </span>
	    <el-divider direction="vertical"></el-divider>
	    <span class="header-user-item" @click="logout">
	        <icon-svg icon="tuichu" size="20" style="margin:-3px 6px;" title="退出系统" @click="logout"></icon-svg>
	    </span>
	</div>
</template>

<script>
    import { mapActions } from 'vuex'
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
            ...mapActions('user',['LogOut']),
            logout(){
				this.LogOut().then(() => {
                    this.$router.push('/')
                    location.reload()
                })
			}
        },
        mounted(){
        }
        
    }
</script>

<style lang="scss" scoped>
    .header-user {
        height: 100%;
        line-height: 1;
        float: right;
        margin-right: 20px;
        display: flex;
        align-items: center;
        font-size: 16px;
    }

    .header-user-item {
        cursor: pointer;
        margin-left: 4px;
        margin-right: 4px;
    }
</style>
