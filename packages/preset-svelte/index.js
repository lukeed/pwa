const { join } = require('path');

exports.webpack = function (config, opts) {
	let isProd = opts.production;

	if (config.resolve.extensions) {
		config.resolve.extensions.push('.html', '.svelte');
	} else {
		config.resolve.extensions = ['.wasm', '.mjs', '.js', '.json', '.html', '.svelte'];
	}

	if (config.resolve.mainFields) {
		config.resolve.mainFields.push('svelte');
	} else {
		config.resolve.mainFields = ['svelte', 'browser', 'module', 'main'];
	}

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
				skipIntroByDefault: true,
				nestedTransitions: true,
			}
		}
	});
}
