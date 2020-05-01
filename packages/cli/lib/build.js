const fs = require('fs');
const del = require('rimraf');
const colors = require('kleur');
const { join } = require('path');
const { gzipSync } = require('zlib');
const pretty = require('./util/pretty');
const { glob, writer } = require('./util/fs');
const log = require('./util/log');

const _ = ' ';
const gutter = _.repeat(4);
const levels = ['cyan', 'yellow', 'red']; // sizes
const th = colors.dim().bold().italic().underline;
const lpad = (str, max) => _.repeat(max - str.length) + str;
const rpad = (str, max) => str + _.repeat(max - str.length);

function chain(arr) {
	return new Promise(res => {
		let out=[];
		let run = fn => (fn.then ? Promise.resolve(fn) : fn()).then(x => out.push(x));
		let next = () => (arr.length > 0) ? run(arr.shift()).then(next) : res(out);
		next();
	});
}

const expression = 'document.documentElement.outerHTML';
const sleep = ms => new Promise(r => setTimeout(r, ms));

function dump(chrome, delay, base, pathname) {
	let url = base + pathname;
	let { Page, Runtime } = chrome;
	let file = join(pathname, 'index.html');

	return Page.navigate({ url }).then(() => {
		return Runtime.evaluate({ expression: 'window.PWA_EXPORT=true;' }).then(() => {
			return Page.loadEventFired().then(() => {
				return sleep(delay).then(() => {
					return Runtime.evaluate({ expression }).then(r => {
						return { file, html:r.result.value };
					});
				});
			});
		});
	});
}

module.exports = function (src, opts) {
	opts.log = log;
	opts.production = true;
	let ctx = require('@pwa/core')(src, opts);
	let dest = ctx.options.output.path;

	del.sync(dest);
	log.log(`Deleted existing ${colors.bold().italic(opts.dest)} directory`);

	ctx.run((err, stats) => {
		let errors = [];
		let warnings = [];

		if (err) {
			errors.push(err);
		} else {
			let tmp = require('webpack-format-messages')(stats);
			warnings = tmp.warnings;
			errors = tmp.errors;
		}

		if (errors.length > 0) {
			let sfx = errors.length > 1 ? 's' : '';
			let out = `Failed to compile! Found ${ colors.red().bold(errors.length) } error${sfx}:`;
			errors.forEach(x => (out += '\n' + x));
			return log.bail(out);
		}

		if (warnings.length > 0) {
			let sfx = warnings.length > 1 ? 's' : '';
			let tmp = `Compiled with ${ colors.yellow().bold(warnings.length) } warning${sfx}:`;
			warnings.forEach(x => (tmp += '\n' + x));
			log.warn(tmp);
		}

		let out = `Compiled in ${pretty.time(stats.endTime - stats.startTime)}`;

		let o, max={ file:0, size:0, gzip:0 };
		let gzip, size, hmap=stats.compilation.assets;
		let assets = Object.keys(hmap).sort().map(file => {
			gzip = gzipSync(hmap[file].source()).length;
			size = pretty.size(hmap[file].size());

			o = { file, size, gzip:pretty.size(gzip) };
			o.notice = gzip >= 2e5 ? 2 : gzip >= 1e5 ? 1 : 0; //~> 200kb vs 100kb

			max.file = Math.max(max.file, file.length);
			max.gzip = Math.max(max.gzip, o.gzip.length);
			max.size = Math.max(max.size, size.length);

			return o;
		});

		// spacing
		max.file += 4;
		max.size += 4;

		// table headers
		out += ('\n\n' + th(rpad('Filename', max.file)) + gutter + th(lpad('Filesize', max.size)) + _ + _ + colors.dim().bold().italic(lpad('(gzip)', max.gzip)));

		assets.forEach(obj => {
			let fn = levels[obj.notice];
			let gz = colors.italic()[obj.notice ? fn : 'dim'](_ + _ + lpad(obj.gzip, max.gzip));
			out += ('\n' + colors.white(rpad(obj.file, max.file)) + gutter + colors[fn](lpad(obj.size, max.size)) + gz);
		});

		log.success(out + '\n');
		log.success(`Build complete!\nYour ${colors.bold().italic().green(opts.dest)} directory is ready for deployment 🎉`);

		if (opts.export && !opts.analyze) {
			console.log(); // newline
			const sirv = require('sirv');
			const { createServer } = require('http');
			const { minify } = require('html-minifier-terser');
			const remote = require('chrome-remote-interface');
			const { launch } = require('chrome-launcher');

			let routes = opts.routes || ctx.PWA_CONFIG.routes;
			let slashes = x => '/' + x.replace(/^\/|\/$/g, '');

			if (Array.isArray(routes)) {
				routes = routes.map(slashes);
			} else if (routes) {
				routes = routes.split(',').map(slashes);
			} else {
				// Get routes from file structure
				let cwd = ctx.options.resolve.alias['@pages'];
				if (fs.existsSync(cwd)) {
					let fmt = x => x.rel.substring(0, x.rel.indexOf('.')).toLowerCase().replace('index', '')
					routes = glob(cwd).map(fmt).map(slashes);
				}
			}

			if (routes) {
				routes.sort((a, b) => b.length - a.length); // root is last (TODO)
			} else {
				routes = ['/'];
				let msg = `Exporting the "${colors.bold().yellow('/')}" route only!\nNo other routes found or specified:`;
				msg += `\n– Your ${colors.bold().italic('@pages')} directory is empty.`;
				if (ctx.PWA_CONFIG) msg += `\n– Your ${colors.underline().magenta('pwa.config.js')} is missing a "${colors.bold('routes')}" key.`;
				msg += `\n– Your ${colors.dim('$ pwa export')} is missing the ${colors.cyan('--routes')} argument.`;
				msg += `\n  Please run ${colors.dim('$ pwa export --help')} for more info\n`;
				log.warn(msg);
			}

			let fn, onNoMatch = (req, res) => fn(Object.assign(req, { path:'/' }), res, () => (res.statusCode=404,res.end()));
			let server = createServer(fn=sirv(dest, { onNoMatch })).listen();

			// Disable sandboxing (on command) for dead-simple CI/CD/Docker integrations
			// @see https://developers.google.com/web/updates/2017/04/headless-chrome#faq
			let chromeFlags = ['--headless', '--disable-gpu'];
			if (opts.insecure) chromeFlags.push('--no-sandbox');

			let base = 'http://localhost:' + server.address().port;
			log.log(`Started local server on ${ colors.white().bold().underline(base) }`);

			let toHTML = x => x.constructor.name === 'HtmlWebpackPlugin';
			let minify_opts = ctx.options.plugins.find(toHTML).options.minify;

			function print(obj) {
				writer(join(dest, obj.file)).end('<!DOCTYPE html>' + minify(obj.html, minify_opts));
				log.info(`Wrote file: ${colors.bold().magenta(obj.file)}`);
			}

			launch({ chromeFlags }).then(proc => {
				return remote({ port:proc.port }).then(chrome => {
					let { Page, Network, DOM } = chrome;
					let scrape = dump.bind(null, chrome, opts.wait, base);
					return Promise.all([Page, Network, DOM].map(x => x.enable())).then(() => {
						return chain(routes.map(x => () => scrape(x).then(print))).then(arr => {
							proc.kill();
							chrome.close();
							server.close();
							log.log('Shutdown local server\n');
							let sfx = arr.length > 1 ? 's' : '';
							let num = colors.italic().bold().green(arr.length);
							log.success(`Export complete!\nGenerated ${num} page${sfx} 🙌🏼`);
						}).catch(err => {
							console.log('> error', err); // TODO
						});
					});
				}).catch(err => {
					log.bail(`Cannot launch Chrome: ${err.message}`);
				});
			});
		}
	});
}
