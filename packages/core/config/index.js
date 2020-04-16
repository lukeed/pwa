exports.babel = {
	babelrc: false,
	cacheDirectory: true,
	presets: [
		['@babel/preset-env', {
			loose: true,
			modules: false,
			targets: {
				// placeholder
			},
			exclude: [
				'transform-regenerator',
				'transform-typeof-symbol'
			]
		}]
	],
	plugins: [
		require.resolve('@babel/plugin-syntax-dynamic-import')
	]
}

exports.css = {
	ignoreOrder: false,
	importLoaders: 2,
	esModule: true,
	modules: {
		localIdentName: '[hash:base64:5]',
	}
}

exports.html = {
	minify: {
		removeComments: true,
		collapseWhitespace: true,
		removeRedundantAttributes: true,
		removeStyleLinkTypeAttributes: true,
		removeScriptTypeAttributes: true,
		useShortDoctype: true,
		minifyCSS: true,
		minifyJS: true,
	}
}

// Any PostCSS config
// ~> "strings" will be required
exports.postcss = {
	plugins: ['autoprefixer']
}

// CSS Preprocessors
exports.less = {};
exports.stylus = {};
exports.sass = {};

// Basic config
// TODO: configure `sourceMap` (globally)
exports.terser = {
	cache: true,
	parallel: true,
	extractComments: false,
	sourceMap: true,
	terserOptions: {
		mangle: true,
		compress: true,
		sourceMap: true,
		output: {
			comments: false
		}
	}
}

// Leave this commented out -- visual docs
// exports.webpack = function (config, opts, env) {}
