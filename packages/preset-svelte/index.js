const { join } = require('path');
const preprocess = require('svelte-preprocess')();

exports.webpack = function (config, env, opts) {
	config.resolve.extensions.push('.html', '.svelte');

	if (config.resolve.mainFields) {
		config.resolve.mainFields.unshift('svelte');
	} else {
		config.resolve.mainFields = ['svelte', 'browser', 'module', 'main'];
	}

	// disable CSS modules
	opts.css.modules = false;

	// turn off "raw-loader" on *.html files
	config.module.rules.forEach(obj => {
		if (obj.test.test('index.html')) {
			let rgx, arr=obj.test.toString().match(/\((.*)\)/);
			if (arr && arr[1]) {
				rgx = arr[1].split('|').filter(x => x !== 'html').join('|');
				obj.test = new RegExp('\\.(' + rgx + ')$');
			}
		}
	});

	config.module.rules.push({
		test: /\.(html|svelte)$/,
		exclude: [
			// Ignore root template (eg src/index.html)
			join(config.context, 'index.html')
		],
		use: {
			loader: 'svelte-loader',
			options: {
				preprocess,
				/**
				 * TODO:
				 * With `emitCss: true` the aliased `url(@assets/link.svg)` instantly throws.
				 * With `emitCss: false`, the same aliased string passes thru, but is still not injected/replaced.
				 * ~> We only want `emitCss: true`, but both  versions seem to be operating too soon or, at least,
				 *    without Webpack's `context` application.
				 *
				 * TODO:
				 * Just straight-up doesn't work if `hotReload` is enabled.
				 * ~> One of many errors: https://github.com/sveltejs/svelte-loader/issues/74
				 */
				emitCss: false,
				// emitCss: true, // TODO
				hotReload: false,
				// hotReload: true, // TODO
				hydratable: true
			}
		}
	});
}
