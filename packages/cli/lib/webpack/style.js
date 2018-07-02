const ExtractCSS = require('mini-css-extract-plugin');

function generate(isProd, name, options) {
	options.sourceMap = isProd;
	return (name += '-loader') && { loader:name, options };
}

module.exports = function (browsers, postcss, opts) {
	let isProd = !!opts.production;
	let fn = generate.bind(null, isProd);
	let plugins=[], rules=[], paths=['node_modules'];
	let ext, filename, chunkFilename;

	let obj = {
		css: [],
		less: fn('less', { paths }),
		sass: fn('sass', { indentedSyntax:true, includePaths:paths }),
		scss: fn('sass', { includePaths:paths }),
		stylus: fn('stylus', { paths }),
		styl: fn('stylus', { paths })
	};

	// assume dev/HMR values initially
	let css={}, arr=[], fallback='style-loader';
	chunkFilename = '[id].chunk.css';
	filename = '[name].css';

	if (isProd) {
		fallback = ExtractCSS.loader; // prepare extraction
		chunkFilename = '[id].chunk.[contenthash:5].css';
		filename = '[name].[contenthash:5].css';
		// TODO: is this prod only?
		css.minimize = css.modules = css.importLoaders = true;
		css.localIdentName = '[local]';
	}

	arr.push(fallback); // add initial
	arr.push(fn('css', css)); // css-loader

	// PostCSS ~> Object, apply browserlist
	postcss.plugins = postcss.plugins || {};
	postcss.plugins.autoprefixer = Object.assign({}, postcss.plugins.autoprefixer, { browsers });
	arr.push(fn('postcss', postcss)); // postcss-loader

	for (ext in obj) {
		rules.push({
			test: new RegExp(`\\.${ext}$`),
			use: arr.concat(obj[ext])
		});
	}

	plugins.push(
		new ExtractCSS({ filename, chunkFilename })
	);

	return { rules, plugins };
}
