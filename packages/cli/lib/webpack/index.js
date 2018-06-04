const webpack = require('webpack');
const { resolve } = require('path');
const { isDir } = require('../utils');
const toConfig = require('./config');

module.exports = function (src, opts) {
	opts.cwd = resolve(opts.cwd || '.');
	opts.production = !!opts.production;

	// use root if "/src" is missing
	src = resolve(opts.cwd, src || 'src');
	src = isDir(src) ? src : opts.cwd;

	let config = toConfig(src, opts);

	if (opts.production && opts.analyze) {
		let { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
		config.plugins.push( new BundleAnalyzerPlugin() );
	}

	if (opts.export) {
		// config.push Prerender anywhere
	}

	return webpack(config);
}
