const webpack = require('webpack');
const { resolve } = require('path');
const rr = require('require-relative');
const toConfig = require('./webpack');
const $ = require('./util');

module.exports = function (src, opts) {
	let cwd = opts.cwd = resolve(opts.cwd || '.');
	let logger = opts.logger || console.log;
	opts.production = !!opts.production;
	delete opts._; // useless

	// Load default configs
	let config = require('./config');
	let tmp, customs=[], handlers=[];

	// Parse configs from local "package.json"
	if (tmp = $.load('package.json', cwd)) {
		let devs = Object.keys(tmp.devDependencies || {});
		// apply any presets first, then plugins
		['preset', 'plugin'].forEach(type => {
			devs.filter(x => x.indexOf(`@pwa/${type}`) == 0).forEach(str => {
				logger(`Applying ${type}: ${str}`);
				customs.push( require(rr.resolve(str, cwd)) ); // allow throw
			});
		});
	}

	// Determine if custom config exists (always last)
	if (tmp = $.load('pwa.config.js', cwd)) {
		logger('Loading custom config');
		customs.push(tmp);
	}

	// Mutate config w/ custom values
	// ~> defer webpack-related changes for later
	customs.forEach(mix => {
		if (typeof mix === 'function') {
			handlers.push(mix); // is webpack only
		} else {
			$.merge(config, mix, opts); //~> mutate
			mix.webpack && handlers.push(mix.webpack);
		}
	});

	// use root if "/src" is missing
	src = resolve(cwd, src || 'src');
	src = $.isDir(src) ? src : cwd;

	// Build Webpack's Config for 1st time
	let wconfig = toConfig(src, config, opts);

	// Apply presets' & custom webpack changes
	opts.webpack = webpack; // pass down to presets
	handlers.forEach(fn => fn(wconfig, opts));

	if (opts.production && opts.analyze) {
		let { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
		wconfig.plugins.push( new BundleAnalyzerPlugin() );
	}

	return webpack(wconfig);
}
