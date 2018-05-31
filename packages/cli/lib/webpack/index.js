const webpack = require('webpack');
const { resolve } = require('path');
const toConfig = require('./config');

module.exports = function (src, opts) {
	src = resolve(src || '.');
	let isProd = !!opts.production;
	let config = toConfig(src, isProd);

	if (isProd && opts.analyze) {
		let { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
		config.plugins.push( new BundleAnalyzerPlugin() );
	}

	if (opts.export) {
		// config.push Prerender anywhere
	}

	return webpack(config);
}
