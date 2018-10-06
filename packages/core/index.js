const { resolve } = require('path');
const rr = require('require-relative');
const toConfig = require('./webpack');
const $ = require('./util');

module.exports = function (src, opts) {
	const webpack = require('webpack');

	let cwd = opts.cwd = resolve(opts.cwd || '.');
	let logger = opts.log ? opts.log.logger : console.log;
	opts.production = !!opts.production;
	delete opts._; // useless

	// Load default configs
	let config = require('./config');
	let tmp, customs=[], handlers=[];

	// Share parsed `browerslist` globally
	opts.browsers = require('browerslist')();

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

	// use root if "/src" is missing
	src = resolve(cwd, src || 'src');
	src = $.isDir(src) ? src : cwd;
	opts.src = src; // share this

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

	// Build Webpack's Config for 1st time
	opts.webpack = webpack; // pass it down
	let wconfig = toConfig(src, config, opts);

	// Apply presets' & custom webpack changes
	handlers.forEach(fn => fn(wconfig, opts, config));

	if (opts.production && opts.analyze) {
		let { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
		wconfig.plugins.push( new BundleAnalyzerPlugin() );
	}

	let ctx = webpack(wconfig);
	ctx.PWA_CONFIG = tmp;
	return ctx;
}
