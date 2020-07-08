/* eslint @typescript-eslint/no-var-requires: 0 */
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'eval',
})
