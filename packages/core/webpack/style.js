const ExtractCSS = require('mini-css-extract-plugin');
const { isEmpty } = require('../util');

function generate(isProd, name, options) {
	options.sourceMap = isProd;
	return (name += '-loader') && { loader:name, options };
}

module.exports = function (browsers, postcss, opts) {
	let isProd = !!opts.production;
	let fn = generate.bind(null, isProd);
	let plugins=[], rules=[], paths=['node_modules'];
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
	let css={}, arr=[], fallback='style-loader';
	chunkFilename = '[id].chunk.css';
	filename = '[name].css';

	css.minimize = css.modules = css.importLoaders = true;
	css.localIdentName = '[local]';

	if (isProd) {
		fallback = ExtractCSS.loader; // prepare extraction
		chunkFilename = '[id].chunk.[contenthash:5].css';
		filename = '[name].[contenthash:5].css';
		css.localIdentName = '[hash:base64:5]';
	}

	arr.push(fallback); // add initial
	arr.push(fn('css', css)); // css-loader

	// PostCSS ~> Array, apply browserlist
	let k, had, tmp=postcss.plugins, out=[], pfx='autoprefixer';

	if (typeof tmp === 'function') {
		throw new Error('Received unsupported `function` type for PostCSS "plugins" config');
	} else if (isEmpty(tmp)) {
		out.push( require(pfx)({ browsers }) );
	} else if (Array.isArray(tmp)) {
		out = tmp.map(x => {
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
			out.push( require(x)(tmp[k] || {}) );
		}
	}

	if (!had) {
		out.push( require(pfx)({ browsers }) );
	}

	postcss.plugins = out;
	arr.push(fn('postcss', postcss)); // postcss-loader

	for (ext in obj) {
		extns.push('.'+ext);
		rules.push({
			test: new RegExp(`\\.${ext}$`),
			use: arr.concat(obj[ext])
		});
	}

	plugins.push(
		new ExtractCSS({ filename, chunkFilename })
	);

	return { extns, rules, plugins };
}
