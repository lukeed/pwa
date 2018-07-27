const CopyWebpackPlugin = require('copy-webpack-plugin');

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
