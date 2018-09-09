const Compression = require('compression-webpack-plugin');

// @see https://github.com/webpack-contrib/compression-webpack-plugin#options
exports.brotli = {
	cache: true,
	threshold: 0,
	minRatio: 0.8,
	compressionOptions: {
		quality: 11,
		size_hint: 0,
		lgblock: 0,
		lgwin: 22,
		mode: 0
	}
}

exports.webpack = function (config, env, opts) {
	if (env.production) {
		opts.brotli.filename = '[path].br[query]';
		opts.brotli.algorithm = require('iltorb').compress;

		config.plugins.push(
			new Compression(opts.brotli)
		);
	}
}
