const Workbox = require('workbox-webpack-plugin');

exports.workbox = {
	advanced: false, // alias
	injectManifest: false, // alias
	swSrc: 'service-worker.js', // template, inject-only
	navigateFallbackWhitelist: [/^(?!\/__).*/],
	navigateFallback: 'index.html',
	swDest: 'sw.js',
	exclude: [
		/\.git/,
		/\.map$/,
		/\.DS_Store/,
		/^manifest.*\.js(?:on)?$/,
		/\.gz(ip)?$/,
		/\.br$/
	]
}

exports.webpack = function (config, env, opts) {
	let isInject = opts.workbox.injectManifest || opts.workbox.advanced;
	let arr = ['advanced', 'injectManifest'];
	let fn = 'GenerateSW';

	if (isInject) {
		fn = 'InjectManifest';
		arr.push('navigateFallback', 'navigateFallbackWhitelist');
	} else {
		arr.push('swSrc');
	}

	// Delete unrecognized keys (per mode)
	arr.forEach(key => delete opts.workbox[key]);

	// Inject-mode assumes "awareness" while developing
	// ~> otherwise, only add in production
	if (isInject || env.production) {
		config.plugins.push(
			new Workbox[fn](opts.workbox)
		);
	}
}
