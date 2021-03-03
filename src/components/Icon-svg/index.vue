<template>
	<svg class="svg-icon" aria-hidden="true" :style="styles">
		<title>{{title}}</title>
		<use :xlink:href="iconName"></use>
	</svg>
</template>

<script>
	export default {
		name: 'icon-svg',
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
				type: String,
			}
		},
		computed: {
			iconName() {
				return `#icon-${this.icon}`
			},
			styles () {
                let style = {};

                if (this.size) {
                    style['font-size'] = `${this.size}px`;
                }
                
                if(this.color){
                	style['color'] = this.color
                }

                return style;
            }
			
		}
	}
</script>
<style>
	.svg-icon {
		font-size: 48px;
		width: 1em;
	    height: 1em;
	    vertical-align: -0.15em;
	    fill: currentColor;
	    overflow: hidden;
	    cursor: pointer;
	    margin-right: 8px;
	}
</style>