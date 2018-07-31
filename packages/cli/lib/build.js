const colors = require('kleur');
const { join } = require('path');
const { gzipSync } = require('zlib');
const pretty = require('./util/pretty');
const log = require('./util/log');
const fs = require('./util/fs');

const _ = ' ';
const gutter = _.repeat(4);
const levels = ['cyan', 'yellow', 'red']; // sizes
const th = str => colors.dim.bold.italic.underline(str);
const lpad = (str, max) => _.repeat(max - str.length) + str;
const rpad = (str, max) => str + _.repeat(max - str.length);

function chain(arr) {
	return new Promise((res, rej) => {
		let out=[];
		let run = fn => (fn.then ? Promise.resolve(fn) : fn()).then(x => out.push(x));
		let next = () => (arr.length > 0) ? run(arr.shift()).then(next) : res(out);
		next();
	});
}

const expression = 'document.documentElement.outerHTML';

function dump(chrome, base, pathname) {
	let url = base + pathname;
	let { Page, Runtime } = chrome;
	let file = join(pathname, 'index.html');

	return Page.navigate({ url }).then(() => {
		return Page.loadEventFired().then(() => {
			return Runtime.evaluate({ expression }).then(r => {
				return { file, html:r.result.value };
			});
		});
	});
}

module.exports = function (src, opts) {
	opts.production = true;
	opts.logger = log.logger;
	let ctx = require('@pwa/core')(src, opts);

	ctx.run((err, stats) => {
		let msgs = require('webpack-format-messages')(stats);
		// console.log(msgs.errors, msgs.warnings);

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
		out += ('\n\n' + th(rpad('Filename', max.file)) + gutter + th(lpad('Filesize', max.size)) + _ + _ + colors.dim.bold.italic(lpad('(gzip)', max.gzip)));

		assets.forEach(obj => {
			let fn = levels[obj.notice];
			let gz = colors.italic[obj.notice ? fn : 'dim'](_ + _ + lpad(obj.gzip, max.gzip));
			out += ('\n' + colors.white(rpad(obj.file, max.file)) + gutter + colors[fn](lpad(obj.size, max.size)) + gz);
		});

		log.success(out + '\n');
		log.success(`Build complete!\nYour ${colors.bold.italic.green('build')} directory is ready for deployment 🎉`);

		if (opts.export) {
			console.log(); // newline
			const sirv = require('sirv');
			const glob = require('tiny-glob/sync');
			const { createServer } = require('http');
			const { minify } = require('html-minifier');
			const { launch } = require('chrome-launcher');
			const remote = require('chrome-remote-interface');

			// Get routes from file structure
			let src = ctx.options.resolve.alias['@pages'];
			let routes = glob('**/*', { cwd:src }).map(str => {
				str = str.substring(0, str.indexOf('.')).replace('index', '');
				return '/' + (str.endsWith('/') ? str.slice(0, -1) : str);
			});

			let fn, dest=ctx.options.output.path;
			let onNoMatch = res => fn({ path:'/' }, res, r => (r.statusCode=404,r.end()));
			let server = createServer(fn=sirv(dest, { onNoMatch })).listen();

			let chromeFlags = ['--headless', '--disable-gpu'];
			let base = 'http://localhost:' + server.address().port;
			log.log(`Started local server on ${ colors.white.bold.underline(base) }`);

			let toHTML = x => x.constructor.name === 'HtmlWebpackPlugin';
			let minify_opts = ctx.options.plugins.find(toHTML).options.minify;

			function print(obj) {
				fs.writer(join(dest, obj.file)).end(minify(obj.html, minify_opts));
				log.info(`Wrote file: ${colors.bold.magenta(obj.file)}`);
			}

			launch({ chromeFlags }).then(proc => {
				return remote({ port:proc.port }).then(chrome => {
					let { Page, Network, DOM } = chrome;
					let scrape = dump.bind(null, chrome, base);
					return Promise.all([Page, Network, DOM].map(x => x.enable())).then(() => {
						return chain(routes.map(x => () => scrape(x))).then(arr => {
							proc.kill();
							chrome.close();
							server.close();
							arr.forEach(print);
							log.log('Shutdown local server\n');
							let sfx = arr.length > 1 ? 's' : '';
							let num = colors.italic.bold.green(arr.length);
							log.success(`Export complete!\nGenerated ${num} page${sfx} 🙌🏼`);
						}).catch(err => {
							console.log('> error', err); //TODO
						});
					});
				});
			});
		}
	});
}
