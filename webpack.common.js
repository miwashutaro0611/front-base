const { resolve, join } = require('path')
const merge = require('webpack-merge')
const pages = require('./webpack.pages.js')
const appDir = resolve(__dirname, 'src')
const buildDir = resolve(__dirname, 'dist')
const assetsPath = {
  basePath: 'assets',
  jsPath: 'assets/js',
	cssPath: 'assets/css',
	staticPath: 'assets/static',
}

module.exports = merge(pages, {
	context: appDir,
	entry: {
		bundle: './assets/js/common.ts',
		head: './assets/js/head.ts'
	},
	output: {
		path: buildDir,
		publicPath: './',
    filename: join(assetsPath.jsPath, '[name]-[hash].js'),
    chunkFilename: join(assetsPath.jsPath, '[name]-[hash].bundle.js')
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
				'ts-loader',
				{
					loader: 'eslint-loader',
					options: {
						typeCheck: true,
					},
				}
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
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: [".ts"]
	}
})