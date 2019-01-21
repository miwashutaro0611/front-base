const path = require('path')
const appDir = path.resolve(__dirname, 'src')
const buildDir = path.resolve(__dirname, 'dist')

module.exports = {
	context: appDir,
  // mode: 'production',
  mode: 'development',

  //メインとなるJavascriptファイル
	entry: {
    bundle: './assets/js/common.js',
	},

  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: buildDir,
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