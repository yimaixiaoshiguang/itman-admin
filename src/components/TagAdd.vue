<template>
    <div>
        <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            :closable="showAddBtn"
            size="larger"
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
        </el-tag>
        <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model.trim="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
            >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput" v-show="showAddBtn">+ 添加</el-button>
    </div>
</template>
<script>
    export default {
        name: 'TagAdd',
        props:{
            dynamicTags:{
                type:Array,
                require:true,
                default:[]
            },
            showAddBtn:{
                type:Boolean,
                default:true
            }
        },
        data() {
            return {
                inputVisible: false,
                inputValue: ''
            };
        },
        mounted() {
            
        },
        methods: {
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
                this.$emit('deleteTag');
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue && this.dynamicTags.indexOf(inputValue) == '-1') {
                    this.dynamicTags.push(inputValue);
                    this.$emit('addTag');
                }

                this.inputVisible = false;
                this.inputValue = '';
            }
        },
    };
</script>
<style lang="scss" scoped>
    .el-tag + .el-tag,.el-tag + .button-new-tag,.el-tag + .input-new-tag {
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
