const { join } = require('path');
const log = require('./util/log');
const { HOST, PORT } = process.env;

module.exports = function (src, opts) {
	opts.logger = log.logger;

	let c = require('@pwa/core')(src, opts);
	let Server = require('webpack-dev-server');

	let cwd = opts.cwd; // mutated
	src = c.options.context; // src vs root
	let publicPath = c.options.output.publicPath;

	let server = new Server(c, {
		hot: true,
		publicPath,
		quiet: true,
		inline: true,
		overlay: true,
		compress: true,
		contentBase: src,
		historyApiFallback: true,
		disableHostCheck: true,
		stats: 'minimal',
		watchOptions: {
			ignored: [
				join(cwd, 'build'),
				join(cwd, 'node_modules')
			]
		}
	});

	server.listen(PORT || opts.port, HOST || opts.host, err => {
		console.log('> err?', err);
	});
}
