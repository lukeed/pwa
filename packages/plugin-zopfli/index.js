const Compression = require('compression-webpack-plugin');

// @see https://github.com/webpack-contrib/compression-webpack-plugin#options
exports.zopfli = {
	cache: true,
	threshold: 0,
	minRatio: 0.8,
	compressionOptions: {
		numiterations: 15
	}
}

exports.webpack = function (config, env, opts) {
	if (env.production) {
		opts.zopfli.algorithm = require('@gfx/zopfli').gzip;

		config.plugins.push(
			new Compression(opts.zopfli)
		);
	}
}
