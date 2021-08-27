module.exports = {

	title: '数据平台管理系统',
	
	logo: require('@/assets/icon_Logo@2x.png'),

	/**
	 * 设置左侧栏的主题
	 * 默认值：dark
	 * value：[dark | light]
	 */
	siderTheme: 'dark',

	/**
	 * 设置左侧栏是否固定
	 * 默认值：false
	 * value：[false | true]
	 */
	siderFixed:false,
	
	/**
	 * 顶部导航栏主题
	 * 默认值为：light
	 * value：[primary | dark | light]
	 */
	headerTheme: 'light',

	/**
	 * 顶部导航栏是否固定
	 * 默认值为：true
	 * value：[false | true]
	 */
	headerFixed: false,

	/**
	 * 顶部导航栏是否置顶
	 * 默认值为：true
	 * value：[false | true]
	 * 前提：headerFixed = true 才可以启动这个属性
	 */
	 headerStick: false,

	/**
	 * @type {boolean} true | false
	 * @description Whether show the logo in sidebar
	 */
	sidebarLogo: true,
	
	/**
	   * @type {boolean} true | false
	   * @description Whether need tagsView
	   */
	tagsView: false,

	tagsFixed: false,

	/**
	 * @position {string} sidebar | navbar
	 * @配置hamburger放在哪个位置
	 */
	 hamburgerPosition:'navbar'
}
