const path = require('path')
const appDir = path.resolve(__dirname, 'src')

module.exports = {
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
					failOnError: true,
					}
				}
				],	
			}
		]
	},
	resolve: {
		extensions: [".ts"]
	}
}