/* eslint @typescript-eslint/no-var-requires: 0 */
const { resolve, join } = require('path')

const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const { merge } = require('webpack-merge')
const pages = require('./webpack.pages.js')
const appDir = resolve(__dirname, 'src')
const buildDir = resolve(__dirname, 'dist')
const assetsPath = {
  basePath: 'assets',
  jsPath: 'assets/js',
  cssPath: 'assets/css',
  imgPath: 'assets/img',
  imgWebpPath: 'assets/img-webp',
  fontPath: 'assets/fonts',
  staticPath: 'static',
}

module.exports = merge(pages, {
  context: appDir,
  entry: {
    bundle: './assets/js/common.ts',
    head: './assets/js/head.ts',
  },
  output: {
    path: buildDir,
    publicPath: '/',
    filename: join(assetsPath.jsPath, '[name]-[hash].js'),
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer({
                    grid: true,
                    flexbox: true,
                  }),
                ],
              },
            },
          },
          'stylus-loader',
        ],
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true,
              root: resolve(appDir, 'pug'),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: assetsPath.imgPath,
          to: assetsPath.imgPath,
        },
      ],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: assetsPath.imgWebpPath,
          to: assetsPath.imgWebpPath,
        },
      ],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: assetsPath.staticPath,
          to: '',
        },
      ],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: assetsPath.fontPath,
          to: assetsPath.fontPath,
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: join(assetsPath.cssPath, '[name]-[hash].css'),
      ignoreOrder: true,
    }),
  ],
  resolve: {
    alias: {
      '~': resolve(appDir, 'assets'),
    },
    extensions: ['.ts', '.js', '.styl'],
  },
})
