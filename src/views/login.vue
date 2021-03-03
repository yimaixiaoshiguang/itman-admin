<template>
	<div class="app-login">
		<div class="login-container">
			<el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px">
			    <div class="login-header">
			        <!-- <span class="login-header-title">{{appTitle}}</span> -->
			        <img src="@/assets/logo.png" style="width: 200px;">
			        <span>数据平台管理系统</span>
			    </div>
			    <el-form-item prop="account" label="账户">
			        <el-input placeholder="请输入账户" v-model="loginForm.account">
			            <icon-svg slot="prefix" icon="zhanghao" size="22" class="iconsvg"></icon-svg>
			        </el-input>
			    </el-form-item>
			    <el-form-item prop="password" label="密码">
			        <el-input placeholder="请输入登录密码" v-model="loginForm.password" type="password">
			            <icon-svg slot="prefix" icon="mima" size="22" class="iconsvg"></icon-svg>
			        </el-input>
			
			    </el-form-item>
			    <el-form-item>
						<el-button type="primary" @click="loginSubmit('loginForm')" class="form-submit">登录</el-button>
						<el-button  class="form-submit" style="margin-left: 35px;">注册</el-button>
			    </el-form-item>
			
			</el-form>
		</div>
		
	</div>
	
</template>

<script>
	export default {
        name:'',
        components: {
        },
        data(){
            return {
				loginForm: {
				    account: '',
				    password: '',
				},
				rules: {
				    account: [{
				        required: true,
				        message: "请输入账户",
				        trigger: "blur"
				    }],
				    password: [{
				        required: true,
				        message: "请输入密码",
				        trigger: "blur"
				    }]
				},
            }
        },
        computed:{
        },
        methods:{
            loginSubmit(formName){
				this.$refs[formName].validate((valid) => {
				    if (valid) {
						
					}else{
						return false
					}
				})
			}
        },
        mounted(){
        }
        
    }
</script>

<style lang="scss" scoped>
	.app-login {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
		
		.login-container {
			position: relative;
			top: 20%;
			left: calc(50% - 250px);
			width: 500px;
			padding: 0 40px 20px;
			border-radius: 4px;
			background: #fff;
			box-shadow: 1px 1px 0px #eee;
			
			.login-header {
				padding: 20px 20px 40px;
				text-align: center;
				font-size: 20px;
			}
			
			.iconsvg {
				color: #4facfe;
			}
		}
	}
</style>