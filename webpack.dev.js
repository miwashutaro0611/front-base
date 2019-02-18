const merge = require('webpack-merge') //webpack.common.jsと結合させるため
const common = require('./webpack.common.js') //共通の読み込みのパスを記載する

module.exports = merge(common, {
  mode: 'development', //開発者モードで作成を行う
  devtool: 'inline-source-map', //jsのソースマップの生成
})