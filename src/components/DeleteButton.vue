<template>
    <el-popover v-model="visible" placement="top" width="160">
        <p>{{ deleteText }}</p>
        <div style="text-align: right; margin: 0;">
            <el-button size="mini" type="text" @click="visible = false">
                取消
            </el-button>
            <el-button type="primary" size="mini" @click="submit">
                确定
            </el-button>
        </div>
        <!-- <icon-svg slot="reference" icon="delete" size="16" title="删除"></icon-svg> -->
        <el-button v-if="buttonType" slot="reference" size="small" style="margin-left: 10px; color: #f56c6c;" :type="buttonType">
            删除
        </el-button>
        <el-button v-else slot="reference" round size="small" style="margin-left: 10px;" type="danger" plain>
            删除
        </el-button>
    </el-popover>
</template>

<script>
export default {
    name: '',
    props: {
        'buttonType': {
            type: String
        },
        'deleteText': {
            type: String,
            default: '确定删除？'
        }
    },
    components: {},
    data() {
        return {
            visible: false
        }
    },
    computed: {},
    methods: {
        submit() {
            this.visible = false
            // console.log(this.$attrs);
            this.$emit('delete', this.$attrs)
        }
    },
    mounted() {}

}
</script>

<style lang="scss" scoped>
</style>
