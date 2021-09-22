var path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];

function resolve(dir) {
	return path.join(__dirname, dir)
}

const isProduction = process.env.ENV !== 'development';

module.exports = {
    assetsDir: 'static',

    devServer: {
		host: '0.0.0.0',
		port: 7011,
		open: true, //配置自动启动浏览器
	},

    productionSourceMap:undefined,

    chainWebpack: (config) => {
		//设置别名
		config.resolve.alias
			.set('@', resolve('src'))
			.set('api', resolve('src/api'))
			.set('assets', resolve('src/assets'))
			.set('components', resolve('src/components'))
			.set('router', resolve('src/router'))
			.set('store', resolve('src/store'))
			.set('views', resolve('src/views'))
	},

    configureWebpack: config => {//webpack配置
		if(isProduction) {
			return {
				plugins : [
					new CompressionWebpackPlugin({//开启Gzip压缩
						algorithm: 'gzip',
						test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
						threshold: 10240,
						minRatio: 0.8
					}),
				],
				optimization: {
					splitChunks: {
						chunks: "all",
					    minSize: 20000,
					    minChunks: 1,
					    maxAsyncRequests: 5,
					    maxInitialRequests: 3,
					    name: true
					}
				},
			}
		}
	},

    css: {
		loaderOptions: {}
	},
}
