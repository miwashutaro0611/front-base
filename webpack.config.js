const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const appDir = path.resolve(__dirname, 'src')
const buildDir = path.resolve(__dirname, 'dist')

module.exports = {
	context: appDir,

	entry: {
    bundle: './assets/js/common.js',
	},

	output: {
		path: buildDir,
		filename: 'js/bundle.js'
	},

	module: {
    rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query:{
					presets: ['es2015']
				}
			},
			{
				test: /\.styl$/,
				loader: ['style-loader','css-loader','stylus-loader'],
			},
			{
				test: /\.pug$/,
				loader: 'pug-loader'
			},
			{
				test: /\.(jpg|png|gif)$/,
				loader: 'url-loader'
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: 'INDEX',
			filename: 'index.html',
			template: './pages/index.pug'
		})
		// new HtmlWebpackPlugin({
		// 	title: 'INDEX - Hello',
		// 	filename: 'hello.html',
		// 	template: 'hello.pug'
		// })
	],

	devtool: 'source-map',
	devServer: {
		contentBase: 'ms/',
		port: 3000,
		inline: true,
		historyApiFallback: true,
		clientLogLevel: "info",
		stats: { colors: true }
	}
};