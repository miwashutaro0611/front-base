const { resolve } = require('path')
const merge = require('webpack-merge')
const pages = require('./webpack.pages.js')
const appDir = resolve(__dirname, 'src')

module.exports = merge(pages, {
	context: appDir,
	entry: {
		bundle: './assets/js/common.ts',
		head: './assets/js/head.ts'
	},
	output: {
		filename: '[name].js'
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