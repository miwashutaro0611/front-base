const path = require('path') //nodeモデュールの読み込み(デフォルトである)
//windowの場合、パスの区切りが`/`の場合ではない時があるので、
//__dirname + '/src' だとおかしい場合がある。なので、以下の記載で行う方が安全。
const appDir = path.resolve(__dirname, 'src')
// __dirname ・・・ 
// 現在実行中のソースコード(webpackのconfigがあるjs)が格納されているディレクトリの絶対パス

// module.exportsに値を設定することでエクスポートを行う。
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
	//出力の処理
  output: {
    // 出力ファイル名
    filename: '[name].js'
  },
	module: { //module.rules ↓の説明
    rules: [ // testの正規表現でヒットしたものを以下で実行させる
			{
				test: /\.js$/, // .jsのファイルなら
				exclude: /node_modules/, // node_modulesは除外
				use: [
          'babel-loader', //babel-loaderを実行
          {
            loader: 'eslint-loader',
            options: {
              failOnError: true,
            }
          }
        ],
				
			}
		]
	},
}