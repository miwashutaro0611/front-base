/* eslint @typescript-eslint/no-var-requires: 0 */
const { resolve } = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    compress: true,
    port: 3000,
  },
})
