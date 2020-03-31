const colors = require('kleur');
const { existsSync } = require('fs');
const { relative, resolve } = require('path');
const pretty = require('./util/pretty');
const log = require('./util/log');

const { HOST, PORT, HTTPS } = process.env;

module.exports = function (src, opts) {
	opts.log = log;

	let c = require('@pwa/core')(src, opts);
	let Server = require('webpack-dev-server');

	let cwd = opts.cwd; // mutated
	src = c.options.context; // src vs root
	let publicPath = c.options.output.publicPath;

	let protocol = 'http';
	let port = PORT || opts.port;
	let hostname = HOST || opts.host;
	let dev = c.options.devServer;

	// use custom configs if KEY === default
	port = port === 8080 && dev.port || port;
	hostname = hostname === 'localhost' && dev.host || hostname;

	if (opts.https || HTTPS || dev.https) {
		let tmp = Object.assign({}, dev.https, opts);
		let { key, cert, cacert } = tmp;
		let hasCA = Boolean(cacert);
		protocol = 'https';

		if (key && cert) {
			key = resolve(cwd, key);
			cert = resolve(cwd, cert);
			cacert = cacert && resolve(cwd, cacert);
			if (existsSync(key) && existsSync(cert)) {
				dev.https = { key, cert, ca:cacert };
			} else {
				let gutter = ' '.repeat(4);
				let space = hasCA ? ' '.repeat(2) : '';
				let out = 'Certificate component(s) not found at locations provided!\n';
				out += colors.bold().white('--key ') + space + gutter + colors.italic().dim(key) + '\n';
				out += colors.bold().white('--cert') + space + gutter + colors.italic().dim(cert);
				if (hasCA) out += '\n' + colors.bold().white('--cacert') + gutter + colors.italic().dim(cacert);
				return log.error(out);
			}
		} else {
			dev.https = true;
			log.warn('Relying on self-signed certificate from `webpack-dev-server` internals');
		}
	}

	if (!opts.quiet) {
		let format = require('webpack-format-messages');
		let uri = require('url').format({ protocol, hostname, port });
		log.log(`Starting development server on ${ colors.white().bold().underline(uri) }`);

		function onError(arr) {
			arr = [].concat(arr || []);
			let sfx = arr.length > 1 ? 's' : '';
			let out = `Failed to compile! Found ${ colors.red().bold(arr.length) } error${sfx}:`;
			arr.forEach(x => (out += '\n' + x));
			return log.error(out);
		}

		c.hooks.invalid.tap('PWA', file => {
			file = relative(cwd, file);
			log.info(`File changed: ${ colors.white().bold(file) }`);
		});

		c.hooks.failed.tap('PWA', onError);

		c.hooks.done.tap('PWA', stats => {
			let { errors, warnings } = format(stats);

			if (errors.length > 0) {
				return onError(errors);
			}

			if (warnings.length > 0) {
				let sfx = warnings.length > 1 ? 's' : '';
				let out = `Compiled with ${ colors.yellow().bold(warnings.length) } warning${sfx}:`;
				warnings.forEach(x => (out += '\n' + x));
				log.warn(out);
			}

			log.success(`Rebuilt in ${pretty.time(stats.endTime - stats.startTime)}`);
		});
	}

	let server = new Server(c, Object.assign(dev, {
		publicPath,
		inline: true,
		host: hostname,
		// @see webpack-dev-server/pull/1486
		// noInfo: true,
		quiet: true,
		port: port,
		hot: true
	}));

	// WDS is annoying AF
	let info = console.info;
	console.info = () => {}; // stfu
	server.listen(port, hostname, err => {
		console.info = info;
		if (err) {
			server.close();
			log.bail('Error starting development server!\n' + err.message);
		}
	});
}
