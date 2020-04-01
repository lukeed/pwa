const ExtractCSS = require('mini-css-extract-plugin');

function generate(isProd, name, options = {}) {
	options.sourceMap = isProd;
	return (name += '-loader') && { loader:name, options };
}

function toModulesObject(existing) {
	if (existing === true || existing === 'local') return { mode: 'local' };
	if (typeof existing === 'string') return { mode: existing };
	return existing; // object
}

module.exports = function (postcss, css, opts) {
	// Throw if `postcss.plugin` is a fn
	if (typeof postcss.plugins === 'function') {
		throw new Error('PostCSS "plugins" config cannot be a function');
	}

	let { src, production } = opts;
	let fn = generate.bind(null, production);
	let test, plugins=[], rules=[];
	let ext, extns=[];

	let obj = {
		css: [],
		less: fn('less'),
		sass: fn('sass', { indentedSyntax: true }),
		scss: fn('sass'),
		stylus: fn('stylus'),
		styl: fn('stylus')
	};

	// assume dev/HMR values initially
	let fallback = 'style-loader';
	let chunkFilename = '[id].chunk.css';
	let filename = '[name].css';

	if (css.modules) {
		css.modules = toModulesObject(css.modules);
	}

	if (production) {
		fallback = ExtractCSS.loader; // prepare extraction
		chunkFilename = '[id].chunk.[contenthash:8].css';
		filename = '[name].[contenthash:8].css';
		// Expose production configuration
		if (css.modules && css.localIdentName) {
			if (!css.localIdentName.includes('[local]')) {
				css.modules.localIdentName = css.localIdentName;
			}
		}
	} else if (css.modules) {
		css.modules.localIdentName = '[local]__[hash:base64:5]';
	}

	let ignoreOrder = css.ignoreOrder;

	// css-loader config shape
	delete css.localIdentName;
	delete css.ignoreOrder;

	plugins.push(
		new ExtractCSS({ filename, chunkFilename, ignoreOrder })
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
