const { join } = require('path');
const colors = require('kleur');
const log = require('./util/log');

const { HOST, PORT } = process.env;

module.exports = function (src, opts) {
	opts.logger = log.logger;

	let c = require('@pwa/core')(src, opts);
	let Server = require('webpack-dev-server');

	let cwd = opts.cwd; // mutated
	src = c.options.context; // src vs root
	let publicPath = c.options.output.publicPath;

	let port = PORT || opts.port || 8080;
	let hostname = HOST || opts.host || 'localhost';
	let server = new Server(c, {
		port,
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
		host: hostname,
		watchOptions: {
			ignored: [
				join(cwd, 'build'),
				join(cwd, 'node_modules')
			]
		}
	});

	server.listen(port, hostname, err => {
		if (err) {
			server.close();
			log.error('Error starting development server!\n' + err.message);
			process.exit(1);
		}
	});
}
