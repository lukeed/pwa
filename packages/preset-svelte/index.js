const { join } = require('path');

exports.webpack = function (config, opts) {
	let isProd = opts.production;

	config.resolve.extensions.push('.html', '.svelte');

	if (config.resolve.mainFields) {
		config.resolve.mainFields.unshift('svelte');
	} else {
		config.resolve.mainFields = ['svelte', 'browser', 'module', 'main'];
	}

	// disable CSS module renaming
	config.module.rules.forEach(obj => {
		if (!Array.isArray(obj.use)) return;
		let css = obj.use.find(o => o.loader && o.loader === 'css-loader');
		if (css) css.options.localIdentName = '[local]';
	});

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
				emitCss: true,
				hotReload: true,
				hydratable: true,
				nestedTransitions: true,
				skipIntroByDefault: true,
				preprocess: require('svelte-preprocess')({
					transformers: {
						sass: {
							indentedSyntax: true
						}
					}
				})
			}
		}
	});
}
