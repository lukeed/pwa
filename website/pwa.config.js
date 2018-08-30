const Precache = require('sw-precache-webpack-plugin');

exports.webpack = function (config, env) {
	if (env.production) {
		config.plugins.push(
			new Precache({
				minify: true,
				filename: 'sw.js',
				stripPrefix: env.src,
				navigateFallback: 'index.html',
				navigateFallbackWhitelist: [/^(?!\/__).*/],
				staticFileGlobsIgnorePatterns: [
					/\.git/,
					/\.map$/,
					/.DS_Store/,
					/manifest\.json$/
				]
			})
		);
	}
}
