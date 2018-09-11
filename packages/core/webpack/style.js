const ExtractCSS = require('mini-css-extract-plugin');
const { isEmpty } = require('../util');

function generate(isProd, name, options) {
	options.sourceMap = isProd;
	return (name += '-loader') && { loader:name, options };
}

module.exports = function (browsers, postcss, opts) {
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

	plugins.push( new ExtractCSS({ filename, chunkFilename }) );

	// PostCSS ~> Array, apply browserlist
	let k, had, tmp=postcss.plugins, pfx='autoprefixer';
	postcss.plugins = [];

	if (typeof tmp === 'function') {
		throw new Error('Received unsupported `function` type for PostCSS "plugins" config');
	} else if (isEmpty(tmp)) {
		postcss.plugins.push( require(pfx)({ browsers }) );
	} else if (Array.isArray(tmp)) {
		postcss.plugins = tmp.map(x => {
			let type = typeof x;
			if (type === 'string') {
				had = had || x === pfx;
				return require(x)(x === pfx ? { browsers } : {});
			} else if (type === 'function') {
				(x.postcssPlugin === pfx) && (had=true) && (x.browsers=browsers);
				return x;
			} else {
				throw new Error(`Found unsupported type \`${type}\` in PostCSS "plugins" config`);
			}
		});
	} else {
		for (k in tmp) {
			if (k === pfx) Object.assign(tmp[k], { browsers });
			postcss.plugins.push( require(k)(tmp[k] || {}) );
		}
	}

	had || postcss.plugins.push( require(pfx)({ browsers }) );
	postcss = fn('postcss', postcss); // loader

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
