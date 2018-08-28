const { join } = require('path');

exports.babel = function (config, env) {
	if (!process.env.NODE_ENV) {
		process.env.NODE_ENV = env.production ? 'production' : 'development';
	}

	config.presets.push(
		require.resolve('babel-preset-react-app')
	);
}

exports.webpack = function (config) {
  config.resolve.alias['@pwa/preset-react'] = join(__dirname, 'app.js');
}
