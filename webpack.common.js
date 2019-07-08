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
					loader: 'tslint-loader',
					options: {
						typeCheck: true,
						fix: true,
					},
				}
				],	
			}
		]
	},
	resolve: {
		extensions: [".ts"]
	}
}