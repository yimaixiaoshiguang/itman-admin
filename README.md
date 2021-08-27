# admin-demo

- Vue 2.6.11 ，Vuex，Vue Router
- element ui
- axios
- vue-splitpane



此demo只是集成了常用组件，常用布局组件，接口对接配置，基础页面，路由流转 基本功能



## 目录结构

```
|-- admin-demo
    |-- .browserslistrc     # browserslistrc 配置文件 (用于支持 Autoprefixer)
    |-- .env.development    # development环境变量配置
    |-- .env.production     # production环境变量配置
    |-- .gitignore
    |-- babel.config.js     # babel-loader 配置
    |-- package-lock.json
    |-- package.json        # package.json 依赖
    |-- README.md
    |-- vue.config.js       # vue-cli 配置
    |-- public              # 静态资源 (会被直接复制)
    |   |-- favicon.ico     # favicon图标
    |   |-- index.html      # html模板
    |-- src
    |   |-- App.vue         # 入口页面
    |   |-- main.ts         # 入口文件 加载组件 初始化等
    |   |-- peimission.ts   # 权限管理
    |   |-- settings.js     # 设置文件
    |   |-- api             # 所有请求
    |   |-- assets          # 主题 字体等静态资源 (由 webpack 处理加载)
    |   |-- components      # 全局组件
    |   |-- filters         # 全局过滤函数
    |   |-- router          # 路由
    |   |-- store           # 全局 vuex store
    |   |-- utils           # 全局方法
    |   |-- views           # 所有页面
    |   |	|-- layout      # 全局布局
    |   |	|-- basePage    # 系统管理（用户，菜单，权限）
    |   |	|-- components  # 业务组件
    |   |	|-- login		# 登录
    
    
```

## 后台接口url配置地址：

.env.development    # development环境变量配置
.env.production     # production环境变量配置



## 组件说明

```
|-- components      # 全局组件
|   |-- Breadcrumb      # 面包屑
|   |-- Hamburger      	# 导航栏
|   |-- Icon-svg      	# svg 图标
|   |-- MDinput      	# md input 输入形式
|   |-- CollapsePane    # 折叠面板
|   |-- DeleteButton    # 删除按钮提示再删除
|   |-- SqlEditor    	# sql编辑器
|   |-- components.js   # 组件定义注册
```

在components.js中统一注册常用组件，在main.js 引用即可



弹性收缩布局，直接用vue-splitpane

```vue
<split-pane split="vertical" :defaultPercent="15" :minPercent="12">
    <div slot="paneL" >
    </div>
    <div slot="paneR" >
    </div>
</split-pane>
```



折叠面板布局，直接用CollapsePane

```vue
<collapse-pane>
	<view-list slot="pane-left"></view-list>
	<view-editor slot="pane-right"></view-editor>
</collapse-pane>
```



## 布局说明

```
|-- layout      # 全局布局
|	|-- components\Sidebar      # 左侧栏
|	|-- components\TagsView     # tag组件
|	|-- components\Navbar      	# 导航栏
```

对于布局，按照项目自由组合即可