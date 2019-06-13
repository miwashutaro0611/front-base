const path = require('path')
const appDir = path.resolve(__dirname, 'src')

module.exports = {
	context: appDir,
	entry: { 
		bundle: './assets/js/common.js'
	},
	output: {
		filename: '[name].js'
	},
	module: {
    rules: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: [
			'babel-loader',
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
}