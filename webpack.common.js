const path = require('path')
const appDir = path.resolve(__dirname, 'src')

module.exports = {
	context: appDir,

  //メインとなるJavascriptファイル
	entry: {
    bundle: './assets/js/common.js',
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
			}
		]
	},

	devtool: 'source-map',
	devServer: {
		contentBase: 'ms/',
		port: 3000,
		inline: true,
		historyApiFallback: true,
		clientLogLevel: "info",
		stats: { colors: true }
	}
}