<template>
    <div>
        <el-tag
            v-for="tag in $attrs.value"
            :key="tag"
            :closable="showAddBtn"
            size="larger"
            :disable-transitions="false"
            @close="handleClose(tag)"
        >
            {{ tag }}
        </el-tag>
        <el-input
            v-if="inputVisible"
            ref="saveTagInput"
            v-model.trim="inputValue"
            class="input-new-tag"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
        />
        <el-button
            v-else
            v-show="showAddBtn"
            class="button-new-tag"
            size="small"
            @click="showInput"
        >
            + 添加
        </el-button>
    </div>
</template>
<script>
export default {
    name: 'TagAdd',
    props: {
        showAddBtn: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            inputVisible: false,
            inputValue: ''
        }
    },
    mounted() {},
    methods: {
        handleClose(tag) {
            let dynamicTags = this.$attrs.value
            dynamicTags.splice(dynamicTags.indexOf(tag), 1)
            this.$emit('input', dynamicTags)
        },
        showInput() {
            this.inputVisible = true
            this.$nextTick(() => {
                this.$refs.saveTagInput.$refs.input.focus()
            })
        },
        handleInputConfirm() {
            let dynamicTags = this.$attrs.value
            let inputValue = this.inputValue
            if (inputValue && dynamicTags.indexOf(inputValue) == '-1') {
                dynamicTags.push(inputValue)
            }
            this.$emit('input', dynamicTags)
            this.inputVisible = false
            this.inputValue = ''
        }
    }
}
</script>
<style lang="scss" scoped>
.el-tag + .el-tag,
.el-tag + .button-new-tag,
.el-tag + .input-new-tag {
	margin-left: 10px;
}

.button-new-tag {
	height: 32px;
	line-height: 30px;
	padding-top: 0;
	padding-bottom: 0;
}
.input-new-tag {
	width: 90px;
	vertical-align: bottom;
}
</style>
