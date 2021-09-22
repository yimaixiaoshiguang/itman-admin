<template>
    <el-tooltip v-if="title" effect="dark" :content="title">
        <svg class="svg-icon" aria-hidden="true" :style="styles">
            <use :xlink:href="iconName" />
        </svg>
    </el-tooltip>
		
    <svg v-else class="svg-icon" aria-hidden="true" :style="styles">
        <use :xlink:href="iconName" />
    </svg>
</template>

<script>
export default {
    name: 'IconSvg',
    props: {
        icon: {
            type: String,
            required: true
        },
        size: [Number, String],
        color: {
            type: String
        },
        title: {
            type: String
        }
    },
    computed: {
        iconName() {
            return `#icon-${this.icon}`
        },
        styles() {
            let style = {}

            if (this.size) {
                style['font-size'] = `${this.size}px`
            }
                
            if (this.color) {
                style['color'] = this.color
            }

            return style
        }
			
    }
}
</script>
<style>
    .svg-icon {
        font-size: 16px;
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
        cursor: pointer;
        margin-right: 8px;
    }
</style>