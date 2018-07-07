exports.babel = function (config, opts) {
	if (!process.env.NODE_ENV) {
		process.env.NODE_ENV = opts.production ? 'production' : 'development';
	}

	config.presets.push(
		require.resolve('babel-preset-react-app')
	);
}
