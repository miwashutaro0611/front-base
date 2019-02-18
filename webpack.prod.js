const merge = require('webpack-merge') //webpack.common.jsと結合させるため
const common = require('./webpack.common.js') //共通の読み込みのパスを記載する

module.exports = merge(common, { // commonの情報を読み込んだ上で以下を読み込む
  mode: 'production', //本番アップ用
  devtool: 'eval', //ソースマップなし・1行に圧縮
})