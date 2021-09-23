<template>
    <el-dropdown
        class="header-user"
        trigger="click"
        style="cursor: pointer"
        @command="handleCommand"
    >
        <span class="el-dropdown-link">
            <span>{{ name }}</span><i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="dashboard">
                主页
            </el-dropdown-item>
            <el-dropdown-item command="personal">
                个人中心
            </el-dropdown-item>
            <el-dropdown-item command="reset">
                修改密码
            </el-dropdown-item>
            <el-dropdown-item divided command="logout">
                退出系统
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: '',
    components: {},
    data() {
        return {}
    },
    computed: {
        name() {
            return this.$store.state.user.username || sessionStorage.getItem('eshop-username')
        }
    },
    methods: {
        ...mapActions('user', ['LogOut']),
        logout() {
            this.LogOut().then(() => {
                this.$router.push('/')
                // location.reload()
            })
        },

        handleCommand(type) {
            if (type == 'dashboard') {
                this.$router.push('/dashboard/index')
            } else if (type == 'personal') {
                this.$router.push('/personal/info')
            } else if (type == 'reset') {
                this.$router.push('/reset/password')
            } else if (type == 'logout') {
                this.logout()
            }
        }
    },
    mounted() {}
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
