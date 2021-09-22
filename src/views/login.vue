<template>
    <div class="app-login">
        <div class="login-container">
            <div class="login-left">
                <div class="text-box">
                    <div class="text-box-item">
                        <span class="word1">让数字</span>
                        <span class="txt1">高度智能</span>
                    </div>
                    <div class="text-box-item">
                        <span class="word1">让商业更为</span>
                        <span class="txt1">灵动</span>
                    </div>
                    <div class="text-box-item">
                        <span class="word1">让互联网</span>
                        <span class="txt1">连接万物</span>
                    </div>
                </div>
            </div>
            <div class="login-right">
                <div class="login-form">
                    <div class="login-header">
                        <p class="welcomeText">Welcome {{ title }}</p>
                        <!-- <p class="welcomeText sys-title" style="font-weight: 500">{{title}}</p> -->
                        <p class="sys-title-sup">让数字高度智能，让商业更为灵动，让互联网连接万物</p>
                    </div>
                    <el-form ref="loginForm" :model="loginForm" :rules="rules" label-position="top">
                        <el-form-item prop="principal" label="请输入您的账户">
                            <el-input
                                v-model="loginForm.principal"
                                v-enter-next-input
                                placeholder="请输入您的账户"
                                size="large"
                                clearable
                                class="inputWidth"
                            >
                                <icon-svg slot="prefix" icon="zhanghao" size="26" class="iconsvg" />
                            </el-input>
                        </el-form-item>
                        <el-form-item
                            prop="credentials"
                            label="请输入您的密码"
                            style="margin-bottom: 76px"
                        >
                            <el-input
                                v-model="loginForm.credentials"
                                placeholder="请输入您的登录密码"
                                type="password"
                                size="large"
                                show-password
                                class="inputWidth"
                                @keyup.enter.native="loginSubmit('loginForm')"
                            >
                                <icon-svg slot="prefix" icon="mima" size="26" class="iconsvg" />
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                v-loading="loading"
                                type="primary"
                                class="black-btn bg"
                                @click="loginSubmit('loginForm')"
                            >
                                登录
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { isMobile } from '@/utils/validate'
export default {
    name: '',
    components: {},
    data() {
        return {
            loginForm: {
                principal: '',
                credentials: ''
            },
            rules: {
                principal: [
                    {
                        required: true,
                        message: '请输入账户',
                        trigger: 'blur'
                    },
                    {
                        // validator:(rule, value, callback) => {
                        // 	const reg = /[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/
                        // 	if(reg.test(value)){
                        // 		callback(new Error('不能输入特殊字符'))
                        // 	}else{
                        // 		callback()
                        // 	}
                        // },
                        // trigger: ['change','blur']
                    }
                ],
                credentials: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }
                ]
            },
            loading: false,
            activeName: 'accordLogin',

            codeForm: {
                loginType: 'mobile',
                mobile: '',
                smsCode: ''
            },
            codeRules: {
                mobile: [
                    {
                        required: true,
                        message: '请输入手机号码',
                        trigger: 'blur'
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (!isMobile(value)) {
                                callback(new Error('手机号格式错误'))
                            } else {
                                callback()
                            }
                        },
                        trigger: ['change', 'blur']
                    }
                ],
                smsCode: [
                    {
                        required: true,
                        message: '请输入验证码',
                        trigger: 'blur'
                    }
                ]
            },

            show: true,
            count: 60, // 倒计时
            timer: null
        }
    },
    computed: {
        title() {
            return this.$store.state.settings.title
        }
    },
    directives: {
        enterNextInput: {
            inserted: function(el) {
                el.addEventListener('keypress', function(e) {
                    e = e || window.event
                    let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode
                    if (charcode == 13) {
                        var dom = document.getElementsByTagName('input')
                        for (var i = 0; i < dom.length; i++) {
                            if (dom[i] == document.activeElement) {
                                if (i == dom.length) {
                                    return
                                }
                                dom[i + 1].focus()
                                return
                            }
                        }
                    }
                })
            }
        }
    },
    methods: {
        loginSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.loading = true

                    let params = {}
                    if (this.activeName == 'accordLogin') {
                        params = this.loginForm
                    } else {
                        params = this.codeForm
                    }

                    this.$store
                        .dispatch('user/LoginByUserName', params)
                        .then(() => {
                            // 有首页的情况，直接跳转到首页
                            this.$router.push('/dashboard')
                        })
                        .catch(() => {})
                        .finally(() => {
                            this.loading = false
                        })
                } else {
                    return false
                }
            })
        }
    },
    mounted() {}
}
</script>

<style lang="scss" scoped>
.app-login {
	width: 100%;
	height: 100vh;
	overflow: hidden;
	background-image: linear-gradient(135deg, #59b3ff 0%, #1c87f0 100%);
	// background: url('@/assets/img/bg/login_bg.png');
	.login-container {
		position: relative;
		width: 100%;
		height: 100vh;
		overflow: hidden;
		// top: calc(50% - 450px);
		// left: calc(50% - 720px);
		// width: 1440px;
		// height: 900px;
		// padding:87px 60px;
		// border-radius: 20px;
		background: #fff;
		// box-shadow: 1px 1px 0px #eee;
		display: flex;
		.login-left {
			width: 480px;
			height: 100%;
			background-image: linear-gradient(to top, #2e3cb3 0%, #222653 100%);
			background: url("~@/assets/img/bg/login_bg.png") left;
			background-size: cover;
			.text-box {
				font-size: 40px;
				color: #fff;
				margin-top: 120px;
				margin-left: 40px;
				.text-box-item {
					margin: 16px 0;
				}
				.txt1 {
					color: #ff683d;
				}
			}
		}
		.login-right {
			flex: 1;
			padding-top: 167px;
			// padding-left: 170px;
			// padding-right: 170px;
		}
		.login-form {
			width: 70%;
			margin: 0 auto;
		}
		.login-header {
			padding: 0 0 30px;
			// text-align: center;
			font-size: 20px;
			.welcomeText {
				font-size: 36px;
				font-weight: bold;
				color: #3a3f63;
				line-height: 54px;
			}
			.sys-title-sup {
				font-size: 16px;
				font-weight: 400;
				color: #6a74a5;
				line-height: 24px;
				margin-top: 8px;
			}
		}
		.svg-icon {
			vertical-align: middle;
		}
		.black-btn {
			width: 240px;
			height: 54px;
			border-radius: 29px;
			font-size: 26px;
		}
		.inputWidth {
			width: 80%;
		}
	}
}
.login-form .el-form-item {
	margin-bottom: 40px;
}
::v-deep .el-input--large .el-input__inner {
	height: 50px;
	// border-radius: 25px;
	line-height: 50px;
	// background-color: rgba(240, 250, 255, 1) !important;
	// border: 1px solid rgba(240, 250, 255, 1);
	padding-left: 48px;
	font-size: 22px;
}
::v-deep .el-input__prefix {
	left: 16px;
	line-height: 50px;
}
::v-deep .el-input__suffix {
	right: 16px;
	line-height: 50px;
}
::v-deep .el-form-item__label {
	font-size: 16px;
}
::v-deep .el-tabs__nav-wrap::after {
	background-color: transparent;
}
::v-deep .el-tabs__item {
	font-size: 16px;
}
::v-deep .el-tabs__header {
	margin: 0 0 30px;
}
.code-btn {
	font-size: 16px;
}
</style>
