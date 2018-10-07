const ExtractCSS = require('mini-css-extract-plugin');

function generate(isProd, name, options) {
	options.sourceMap = isProd;
	return (name += '-loader') && { loader:name, options };
}

module.exports = function (postcss, opts) {
	// Throw if `postcss.plugin` is a fn
	if (typeof postcss.plugins === 'function') {
		throw new Error('PostCSS "plugins" config cannot be a function');
	}

	let { src, production } = opts;
	let fn = generate.bind(null, production);
	let test, plugins=[], rules=[], paths=['node_modules'];
	let ext, filename, chunkFilename, extns=[];

	let obj = {
		css: [],
		less: fn('less', { paths }),
		sass: fn('sass', { indentedSyntax:true, includePaths:paths }),
		scss: fn('sass', { includePaths:paths }),
		stylus: fn('stylus', { paths }),
		styl: fn('stylus', { paths })
	};

	// assume dev/HMR values initially
	let css={}, fallback='style-loader';
	chunkFilename = '[id].chunk.css';
	filename = '[name].css';

	css.localIdentName = '[local]__[hash:base64:5]';
	css.importLoaders = 1;
	css.modules = true;

	if (production) {
		fallback = ExtractCSS.loader; // prepare extraction
		chunkFilename = '[id].chunk.[contenthash:5].css';
		filename = '[name].[contenthash:5].css';
		css.localIdentName = '[hash:base64:5]';
	}

	plugins.push(
		new ExtractCSS({ filename, chunkFilename })
	);

	postcss.plugins = postcss.plugins.map(str => {
		return typeof str === 'string' ? require(str) : str;
	});

	postcss = fn('postcss', postcss); //=> loader
	let user = [fallback, fn('css', css), postcss];
	let vendor = [fallback, fn('css', { sourceMap:true }), postcss];

	for (ext in obj) {
		extns.push('.'+ext);
		test = new RegExp(`\\.${ext}$`);
		rules.push({ test, include:[src], use:user.concat(obj[ext]) });
		rules.push({ test, exclude:[src], use:vendor.concat(obj[ext]) });
	}

	return { extns, rules, plugins };
}
