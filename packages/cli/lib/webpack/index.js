const webpack = require('webpack');
const { resolve } = require('path');
const rr = require('require-relative');
const toConfig = require('./config');
const $ = require('../utils');

module.exports = function (src, opts) {
	opts.cwd = resolve(opts.cwd || '.');
	opts.production = !!opts.production;
	delete opts._; // useless

	// use root if "/src" is missing
	src = resolve(opts.cwd, src || 'src');
	src = $.isDir(src) ? src : opts.cwd;

	let config = toConfig(src, opts);

	if (opts.production && opts.analyze) {
		let { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
		config.plugins.push( new BundleAnalyzerPlugin() );
	}

	if (opts.export) {
		// config.push Prerender anywhere
	}

	// Apply "@pwa/preset"s if any
	let pkg = resolve(opts.cwd, 'package.json');
	if (pkg = $.toFile(pkg)) {
		let devs = Object.keys(pkg.devDependencies || {});
		devs.filter(x => x.indexOf('@pwa/preset') == 0).forEach(str => {
			console.log('[PWA] Applying preset :: `%s`', str);
			str = rr.resolve(str, opts.cwd);
			require(str)(config, opts); // allow throw
		});
	}

	// Apply Custom Config mutations
	let custom = resolve(opts.cwd, 'pwa.config.js');
	if (custom = $.toFile(custom)) {
		console.log('[PWA] Loading custom config');
		custom(config, opts);
	}

	return webpack(config);
}
