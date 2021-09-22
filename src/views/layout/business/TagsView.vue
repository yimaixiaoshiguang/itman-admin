<template>
    <mtag>
        <el-tabs v-model="currentTag" type="card" @tab-click="tagChange" @tab-remove="removeTab">
            <el-tab-pane
                v-for="item in visitedViews"
                :key="item.path"
                :label="item.title"
                :name="item.path"
                :closable="item.path !='/dashboard/index'"
            />
        </el-tabs>
        <div class="mvk-tags-view-close">
            <el-dropdown @command="tagClose">
                <el-button type="primary" size="small" class="btn">
                    <i class="el-icon-arrow-down el-icon--right" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="others">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </mtag>
</template>

<script>
import path from 'path'

export default {
    name: 'TagsView',
    components: {
        'mtag': () => import('../components/AppTags')
    },
    data() {
        return {
            affixTags: [],
            currentTag: this.$route.path
        }
    },
    computed: {

        visitedViews() {
            return this.$store.state.tagsView.visitedViews
        },
        routes() {
            return this.$router.options.routes
        }

    },
    watch: {
        $route() {
            this.addTags()
            this.currentTag = this.$route.path
        }
    },
    mounted() {
        this.initTags()
        this.addTags()
    },
    methods: {
			
        tagChange(tab) {
            this.$router.push(tab.name)
        },
        // 更多操作
        tagClose(type) {
            const view = this.visitedViews.filter(item => item.path === this.currentTag)[0]
            if (type == 'others') {
                this.closeOthersTags(view)
            } else if (type == 'all') {
                this.closeAllTags(view)
            }
        },
        // 删除当前tag
        removeTab(targetName) {
            const view = this.visitedViews.filter(item => item.path === targetName)[0]
            this.closeSelectedTag(view)
        },
        filterAffixTags(routes, basePath = '/') {
            let tags = []
            routes.forEach(route => {
                if (route.meta && route.meta.affix) {
                    const tagPath = path.resolve(basePath, route.path)
                    tags.push({
                        fullPath: tagPath,
                        path: tagPath,
                        name: route.name,
                        meta: { ...route.meta
                        }
                    })
                }
                if (route.children) {
                    const tempTags = this.filterAffixTags(route.children, route.path)
                    if (tempTags.length >= 1) {
                        tags = [...tags, ...tempTags]
                    }
                }
            })
            return tags
        },
        initTags() {
            const affixTags = this.affixTags = this.filterAffixTags(this.routes)
            for (const tag of affixTags) {
                // Must have tag name
                if (tag.name) {
                    this.$store.dispatch('tagsView/addVisitedView', tag)
                }
            }
        },
        addTags() {
            const {
                name
            } = this.$route
            if (name) {
                this.$store.dispatch('tagsView/addView', this.$route)
            }
            return false
        },
        closeSelectedTag(view) {
            this.$store.dispatch('tagsView/delView', view).then(({
                visitedViews
            }) => {
                if (this.currentTag == this.$route.path) {
                    this.toLastView(visitedViews, view)
                }
            })
        },
        closeOthersTags(view) {
            this.$store.dispatch('tagsView/delOthersViews', view)
        },
        closeAllTags(view) {
            this.$store.dispatch('tagsView/delAllViews').then(({
                visitedViews
            }) => {
                if (this.affixTags.some(tag => tag.path === view.path)) {
                    return
                }
                this.toLastView(visitedViews)
            })
        },
        toLastView(visitedViews) {
            const latestView = visitedViews.slice(-1)[0]
            if (latestView) {
                this.$router.push(latestView)
            } else {
                this.$router.push('/dashboard/index')// 首页
            }
        }
    }
}
</script>

<style lang="scss">

</style>