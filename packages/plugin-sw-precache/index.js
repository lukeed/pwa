const Precache = require('sw-precache-webpack-plugin');

exports.precache = {
	minify: true,
	filename: 'sw.js',
	navigateFallback: 'index.html',
	navigateFallbackWhitelist: [/^(?!\/__).*/],
	staticFileGlobsIgnorePatterns: [
		/\.git/,
		/\.DS_Store/,
		/manifest\.json$/,
		/\.gz(ip)?$/,
		/\.map$/,
		/\.br$/
	]
}

exports.webpack = function (config, env, opts) {
	Object.assign(opts.precache, {
		stripPrefix: env.src,
		logger(msg) {
			if (msg.includes('Total precache size')) return;
			if (msg.includes('Skipping static')) return;
			env.logger.log(msg);
		}
	});

	if (env.production) {
		config.plugins.push(
			new Precache(opts.precache)
		);
	}
}
