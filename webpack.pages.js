/* eslint @typescript-eslint/no-var-requires: 0 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInjector = require('./webpack.htmlinjector')

const commonOptions = {
  filename: '',
  template: '',
  chunks: ['bundle', 'head'],
  chunksConfig: {
    defer: ['bundle'],
  },
}

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      ...commonOptions,
      filename: 'index.html',
      template: 'pug/index.pug',
    }),
    new HtmlWebpackPlugin({
      ...commonOptions,
      filename: 'about/index.html',
      template: 'pug/about/index.pug',
    }),
    new HtmlWebpackInjector(),
  ],
}
