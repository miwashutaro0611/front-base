const path = require('path')
const appDir = path.resolve(__dirname, 'src')

module.exports = {
	context: appDir,
  //メインとなるJavascriptファイル
	entry: {
    bundle: './assets/js/common.js',
	},

  output: {
    // 出力ファイル名
    filename: 'bundle.js'
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
}