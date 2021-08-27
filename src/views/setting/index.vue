<template>
    <div>
        <div>
            侧边栏主题：
            <el-radio-group v-model="msiderTheme" @change="themeChange('siderTheme',msiderTheme)">
                <el-radio label="dark">dark</el-radio>
                <el-radio label="light">light</el-radio>
            </el-radio-group>
        </div>
        <div>
            顶部导航栏主题
            <el-radio-group v-model="mheaderTheme" @change="themeChange('headerTheme',mheaderTheme)">
                <el-radio label="primary">primary</el-radio>
                <el-radio label="dark">dark</el-radio>
                <el-radio label="light">light</el-radio>
            </el-radio-group>
        </div>
        <div>
            hamburger位置
            <el-radio-group v-model="mhamburgerPosition" @change="themeChange('hamburgerPosition',mhamburgerPosition)">
                <el-radio label="navbar">导航栏</el-radio>
                <el-radio label="sidebar">侧边栏</el-radio>
            </el-radio-group>
        </div>
        <div>
            固定侧边栏
            <el-switch
                v-model="msiderFixed"
                @change="themeChange('siderFixed',msiderFixed)">
            </el-switch>
        </div>
        <div>
            固定导航栏
            <el-switch
                v-model="mheaderFixed"
                @change="themeChange('headerFixed',mheaderFixed)">
            </el-switch>
        </div>
        <div v-if="mheaderFixed">
            导航栏置顶
            <el-switch
                v-model="mheaderStick"
                @change="themeChange('headerStick',mheaderStick)">
            </el-switch>
        </div>
        <div>
            开启多页签
            <el-switch
                v-model="mtagsView"
                @change="themeChange('tagsView',mtagsView)">
            </el-switch>
        </div>
        <div>
            多页签固定
            <el-switch
                v-model="mtagsFixed"
                @change="themeChange('tagsFixed',mtagsFixed)">
            </el-switch>
        </div>
        
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'Setting',
    data() {
        return {
            msiderTheme:this.$store.state.settings.siderTheme,
            mheaderTheme:this.$store.state.settings.headerTheme,
            msiderFixed:this.$store.state.settings.siderFixed,
            mheaderFixed:this.$store.state.settings.headerFixed,
            mheaderStick:this.$store.state.settings.headerStick,
            mtagsView:this.$store.state.settings.tagsView,
            mtagsFixed:this.$store.state.settings.tagsFixed,
            mhamburgerPosition:this.$store.state.settings.hamburgerPosition,
        };
    },
    mounted() {
        
    },
    methods: {
        ...mapActions('settings', ['changeSetting']),

        themeChange(type,val){
            this.changeSetting({
                key:type,
                value:val
            })

            if(type == 'headerFixed' && !val){
                this.changeSetting({
                    key:'headerStick',
                    value:false
                })
                this.mheaderStick = false
            }
        },
    },
};
</script>

<style lang="scss" scoped>

</style>