const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'pug/index.pug',
      inject: false
    }),
    new HtmlWebpackPlugin({
      filename: 'about/index.html',
      template: 'pug/about/index.pug',
      inject: false
    }),
  ]
}