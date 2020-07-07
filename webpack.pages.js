/* eslint @typescript-eslint/no-var-requires: 0 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInjector = require('./webpack.htmlinjector')

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'pug/index.pug',
      chunks: ['bundle', 'head'],
      chunksConfig: {
        defer: ['bundle'],
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'about/index.html',
      template: 'pug/about/index.pug',
      chunks: ['bundle', 'head'],
      chunksConfig: {
        defer: ['bundle'],
      },
    }),
    new HtmlWebpackInjector(),
  ],
}
