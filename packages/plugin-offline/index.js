const Offline = require('offline-plugin');

exports.offline = {
	externals: [],
	appShell: '/index.html',
	excludes: ['**/.*', '**/*.map', '**/*.gz', '**/*.gzip', '**/*.br'],
	ServiceWorker: {
		output: 'sw.js',
		events: true
	}
}

exports.webpack = function (config, env, opts) {
	if (env.production) {
		config.plugins.push(
			new Offline(opts.offline)
		);
	}
}
