<template>
    <div class="navbar">
        <hamburger v-if="hamburgerPosition == 'navbar'" />
        <breadcrumb class="breadcrumb-container" />
        <div>
            <logout />
            <icon-svg icon="more" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from './Breadcrumb.vue'
import Hamburger from './Hamburger.vue'
import logout from '../business/Logout'

export default {
    components: {
        Hamburger,
        Breadcrumb,
        logout
    },
    computed: {
        ...mapGetters(['sidebar']),
		
        hamburgerPosition() {
            return this.$store.state.settings.hamburgerPosition
        }
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
.navbar {
    display: flex;
    flex: 1;
    .breadcrumb-container {
        flex: 1;
        display: flex;
        align-items: center;
    }
    &.navbar-imgbg {
        background: #000;

        // /deep/ .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
        // 	color: #c8c8c8;
        // }
        .hamburger-container {
            color: #000;
        }
    }
}
</style>
