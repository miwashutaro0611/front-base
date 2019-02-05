const path = require('path')
const appDir = path.resolve(__dirname, 'src')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  // ファイルの出力設定
  output: {
    // 出力ファイル名
    filename: 'bundle.js'
	},
})