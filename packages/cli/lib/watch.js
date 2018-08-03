const colors = require('kleur');
const { join, relative } = require('path');
const pretty = require('./util/pretty');
const log = require('./util/log');

const { HOST, PORT } = process.env;

module.exports = function (src, opts) {
	opts.logger = log.logger;

	let c = require('@pwa/core')(src, opts);
	let Server = require('webpack-dev-server');

	let cwd = opts.cwd; // mutated
	src = c.options.context; // src vs root
	let publicPath = c.options.output.publicPath;

	// TODO https flag
	// TODO key, cert, cacert flags ~> object
	let port = PORT || opts.port || 8080;
	let hostname = HOST || opts.host || 'localhost';
	let protocol = opts.https ? 'https' : 'http';

	if (!opts.quiet) {
		let uri = require('url').format({ protocol, hostname, port });
		log.log(`Starting development server on ${ colors.white.bold.underline(uri) }`);

		let format = require('webpack-format-messages');
		c.hooks.invalid.tap('PWA', file => {
			file = relative(cwd, file);
			log.info(`File changed: ${ colors.white.bold(file) }`);
		});
		c.hooks.done.tap('PWA', stats => {
			let out, sfx, { errors, warnings }=format(stats);
			if (errors.length > 0) {
				sfx = errors.length > 1 ? 's' : '';
				out = `Failed to compile! Found ${ colors.red.bold(errors.length) } error${sfx}:`;
				errors.forEach(x => (out += '\n' + x));
				return log.error(out);
			}
			if (warnings.length > 0) {
				sfx = warnings.length > 1 ? 's' : '';
				out = `Compiled with ${ colors.yellow.bold(warnings.length) } warning${sfx}:`;
				warnings.forEach(x => (out += '\n' + x));
				log.warn(out);
			}
			log.success(`Rebuilt in ${pretty.time(stats.endTime - stats.startTime)}`);
		});
	}

	let server = new Server(c, {
		port,
		// https, // TODO
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
