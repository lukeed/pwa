const Compression = require('compression-webpack-plugin');

// @see https://github.com/webpack-contrib/compression-webpack-plugin#options
exports.gzip = {
	cache: true,
	threshold: 0,
	minRatio: 0.8,
	compressionOptions: {
		level: 9
	}
}

exports.webpack = function (config, env, opts) {
	if (env.production) {
		opts.gzip.algorithm = 'gzip';

		config.plugins.push(
			new Compression(opts.gzip)
		);
	}
}
