<template>
	<div class="vue-codemirror">
		<textarea ref="sqleditor"></textarea>
	</div>
	
</template>

<script>
	import "codemirror/theme/blackboard.css";
	import "codemirror/lib/codemirror.css";
	import "codemirror/addon/hint/show-hint.css";
	let CodeMirror = require("codemirror/lib/codemirror");
	require("codemirror/keymap/sublime");
	require("codemirror/addon/edit/matchbrackets");
	require("codemirror/addon/selection/active-line");
	require("codemirror/mode/sql/sql");
	require("codemirror/addon/hint/show-hint");
	require("codemirror/addon/hint/sql-hint");

    import { debounce } from 'lodash'
	
	export default {
        name:'',
        components: {
        },
        props:['code'],
        data(){
            return {
				editor:null,
            }
        },
        computed:{
        },
		watch: {
            code(newValue, oldValue) {
				this.editor.setValue(newValue)
			}
		},
        methods:{
			/**
			 * 编辑器初始化
			 */
            init(){
                let vm = this
				let mime = 'text/x-mariadb'
				let theme = 'blackboard'//设置主题，不设置的会使用默认主题
				this.editor = CodeMirror.fromTextArea(this.$refs.sqleditor, {
					mode: 'text/x-sql',//选择对应代码编辑器的语言，我这边选的是数据库，根据个人情况自行设置即可
					indentWithTabs: true,
					smartIndent: true,
					lineNumbers: true,
					matchBrackets: true,
					// theme: '3024-day',
					autofocus: true,
					extraKeys: {
					},//自定义快捷键
					hint: CodeMirror.hint.sql,
					hintOptions: {//自定义提示选项
					}
				 })

                 this.editor.on("change", debounce ((instance,changeObj)=>{
						console.log(instance);
                        console.log(changeObj);
                        console.log(vm.editor.getValue());
                        vm.$emit('change',vm.editor.getValue())
				 },1000));
				 
				 this.editor.on("keyup", function (cm, event) {
				     //所有的字母和'$','{','.'在键按下之后都将触发自动完成
				     if (!cm.state.completionActive &&
				         ((event.keyCode >= 65 && event.keyCode <= 90 ) || event.keyCode == 52 || event.keyCode == 219 || event.keyCode == 190)) {
				         CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
				     }
				 });

				 if(this.code){
					 this.editor.setValue(this.code)
				 }
			},

            clear(){
                this.editor.setValue('')
            }
        },
        mounted(){
			this.init()
        },
		destroyed(){
			const element = document.querySelector('.vue-codemirror')
			element && element.remove && element.remove()
		}
        
    }
</script>

<style lang="scss" scoped>
	.vue-codemirror {
		flex: 1;
		height: 100%;
	}

    ::v-deep .CodeMirror {
        border: 1px solid #DCDFE6;
        border-radius: 4px;
    }
	
</style>
