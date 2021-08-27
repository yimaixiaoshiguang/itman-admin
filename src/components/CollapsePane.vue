<template>
    <div class="fixed-layout">
        <div class="fixed-layout-left" :class="{'collapse':collapsep}">
            <span class="expand" @click="collapsep = !collapsep">
                <el-tooltip class="item" effect="dark" :content="collapsep?'固定':'收起'" placement="right-start">
                    <i :class="{'el-icon-arrow-right':collapsep,'el-icon-arrow-left':!collapsep}"></i>
                </el-tooltip>
                
            </span>
            <slot name="pane-left"></slot>
        </div>
        <div class="fixed-layout-right">
            <slot name="pane-right"></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'CollapsePane',
        props:{
            collapse:{
                type:Boolean,
                default:true
            }
        },
        data() {
            return {
                collapsep:this.collapse
            };
        },
        mounted() {
            
        },
        methods: {
            
        },
    };
</script>
<style lang="scss" scoped>
    .fixed-layout {
        display: flex;

        width: 100%;
        height: 100%;
        .fixed-layout-left{
            position: relative;
            width: 240px;
            margin-right: 15px;
            transition: all 0.28s;

            .expand {
                position: absolute;
                right: -12px;
                top: 17px;
                display: inline-block;
                width: 24px;
                height: 24px;
                cursor: pointer;
                color: #fff;
                opacity: .4;
                background: #9cacbf;
                border-radius: 24px;
                text-align: center;
                z-index: 101;
            }

            &.collapse {
                width: 0;
                margin-right: 0;
            }
        }

        

        .fixed-layout-right{
            flex: 1;
            
        }
    }
</style>
