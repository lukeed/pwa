const CopyWebpackPlugin = require('copy-webpack-plugin');

exports.browsers = [
	'last 2 Chrome version'
]

// TEMP
exports.webpack = function (config, env) {
	if (env.production) {
		config.plugins.push(
			new CopyWebpackPlugin([{
				from: 'assets',
				to: 'assets'
			}])
		);
	}
}
