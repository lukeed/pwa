const colors = require('kleur');
const { existsSync } = require('fs');
const { join, relative, resolve } = require('path');
const pretty = require('./util/pretty');
const log = require('./util/log');

const { HOST, PORT, HTTPS } = process.env;

module.exports = function (src, opts) {
	opts.logger = log.logger;

	let c = require('@pwa/core')(src, opts);
	let Server = require('webpack-dev-server');

	let cwd = opts.cwd; // mutated
	src = c.options.context; // src vs root
	let publicPath = c.options.output.publicPath;

	let protocol = 'http';
	let port = PORT || opts.port || 8080;
	let hostname = HOST || opts.host || 'localhost';

	if (opts.https || HTTPS) {
		let { key, cert, cacert } = opts;
		protocol = 'https';

		if (key && cert) {
			key = resolve(cwd, key);
			cert = resolve(cwd, cert);
			cacert = cacert && resolve(cwd, cacert);
			if (existsSync(key) && existsSync(cert)) {
				opts.https = { key, cert, ca:cacert };
			} else {
				let gutter = ' '.repeat(4);
				let space = opts.cacert ? ' '.repeat(2) : '';
				let out = 'Certificate component(s) not found at locations provided!\n';
				out += colors.bold.white('--key ') + space + gutter + colors.italic.dim(key) + '\n';
				out += colors.bold.white('--cert') + space + gutter + colors.italic.dim(cert);
				if (opts.cacert) out += '\n' + colors.bold.white('--cacert') + gutter + colors.italic.dim(cacert);
				return log.error(out);
			}
		} else {
			opts.https = true;
			log.warn('Relying on self-signed certificate from `webpack-dev-server` internals');
		}
	}

	if (!opts.quiet) {
		let format = require('webpack-format-messages');
		let uri = require('url').format({ protocol, hostname, port });
		log.log(`Starting development server on ${ colors.white.bold.underline(uri) }`);

		c.hooks.invalid.tap('PWA', file => {
			file = relative(cwd, file);
			log.info(`File changed: ${ colors.white.bold(file) }`);
		});

		c.hooks.done.tap('PWA', stats => {
			let { errors, warnings } = format(stats);

			if (errors.length > 0) {
				let sfx = errors.length > 1 ? 's' : '';
				let out = `Failed to compile! Found ${ colors.red.bold(errors.length) } error${sfx}:`;
				errors.forEach(x => (out += '\n' + x));
				return log.error(out);
			}

			if (warnings.length > 0) {
				let sfx = warnings.length > 1 ? 's' : '';
				let out = `Compiled with ${ colors.yellow.bold(warnings.length) } warning${sfx}:`;
				warnings.forEach(x => (out += '\n' + x));
				log.warn(out);
			}

			log.success(`Rebuilt in ${pretty.time(stats.endTime - stats.startTime)}`);
		});
	}

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
		https: opts.https,
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
