<template>
	<div class="mvk-tags-view" :class="tagsClass" :style="styles">
		<div class="mvk-tags-view-main">
			<slot/>
		</div>
	</div>
	
</template>

<script>
	import { mapState } from 'vuex'

	function getScroll(target, top) {
        const prop = top ? 'pageYOffset' : 'pageXOffset';
        const method = top ? 'scrollTop' : 'scrollLeft';
        let ret = target[prop];
        if (typeof ret !== 'number') {
            ret = window.document.documentElement[method];
        }
        return ret;
    }

	export default {
		name:'AppTags',
		// props:{
		// 	affix:{
		// 		type:Boolean,
		// 		dafault:false
		// 	},
		// 	tagsFixed:{
		// 		type:Boolean,
		// 		dafault:false
		// 	},
		// 	collapse:{
		// 		type:Boolean,
		// 		dafault:false
		// 	},
		// },
		data() {
			return {
				rectTop:0,//离顶部的距离
				styles:{}
			}
		},
		computed: {
			...mapState('settings',['tagsFixed','headerFixed']),

			affix(){
				return !this.headerFixed
			},

			collapse() {
				return !this.$store.state.app.sidebar.opened;
			},

			tagsClass(){
				return {
					'mvk-tags-view-fixed':this.tagsFixed,
					'mvk-tags-view-sider-collapse':this.tagsFixed && this.collapse
				}
			},
		},
		watch: {
		},
		mounted() {
			this.rectTop = this.$el.getBoundingClientRect().top
			window.addEventListener('scroll', this.handleScroll)
		},
		activated() {
			this.handleScroll()
		},
		destroyed() {
			window.removeEventListener('scroll', this.handleScroll)
		},
		methods: {
			handleScroll () {
				if(this.tagsFixed && this.affix){
					const scrollTop = getScroll(window, true);
					// Fixed Top
					if (scrollTop < this.rectTop) {
						this.styles = {
							top: (this.rectTop - scrollTop)+'px',
						};
					} else {
						this.styles = {
							top:0
						};
					}
				}
            },
		}
	}
</script>

<style lang="scss" scoped>
	
</style>