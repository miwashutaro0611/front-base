const path = require('path')
const appDir = path.resolve(__dirname, 'src')

module.exports = {
	// ビルドの対象となるディレクトリ
	context: appDir,
  //メインとなるJavascriptファイル
	entry: { 
		//コンパイル前のjsのファイル(基本的なもの)
		bundle: './assets/js/common.js',
		//ローディングのみ別で分けたかったので、別のファイルに（現状はなにもないので、全体と同じものを配置・名前のみ変更）
		load: './assets/js/common.js',
	},

  output: {
    // 出力ファイル名
    filename: '[name].js'
  },

	module: {
    rules: [
			{
				test: /\.js$/, // .jsのファイルなら
				exclude: /node_modules/, // node_modulesは除外
				loader: 'babel-loader', //babel-loaderを実行
				query:{
					presets: ['es2015'] //ES2015の
				}
			}
		]
	},
}