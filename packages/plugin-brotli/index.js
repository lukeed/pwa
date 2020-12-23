const Compression = require('compression-webpack-plugin');
const zlib = require('zlib');

// @see https://github.com/webpack-contrib/compression-webpack-plugin#options
exports.brotli = {
	threshold: 0,
	minRatio: 0.8,
	compressionOptions: {
		params: {
			[zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_GENERIC,
			[zlib.constants.BROTLI_PARAM_QUALITY]: 11,
			[zlib.constants.BROTLI_PARAM_SIZE_HINT]: 0,
			[zlib.constants.BROTLI_PARAM_LGBLOCK]: 0,
			[zlib.constants.BROTLI_PARAM_LGWIN]: 22
		}
	}
}

exports.webpack = function (config, env, opts) {
	if (env.production) {
		opts.brotli.filename = '[path].br[query]';
		opts.brotli.algorithm = zlib.brotliCompress;

		config.plugins.push(
			new Compression(opts.brotli)
		)
	}
}
