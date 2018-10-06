exports.babel = {
	babelrc: false,
	cacheDirectory: true,
	presets: [
		['@babel/preset-env', {
			loose: true,
			modules: false,
			targets: {
				uglify: true,
				// "browsers" are injected
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

// Any PostCSS config
// ~> "autoprefixer" will be replaced
exports.postcss = {
	plugins: ['autoprefixer']
}

// Basic config
// TODO: configure `sourceMap` (globally)
exports.uglify = {
	cache: true,
	parallel: true,
	sourceMap: true,
	uglifyOptions: {
		mangle: true,
		compress: true,
		sourceMap: true,
		output: {
			comments: false
		}
	}
}

// Leave this commented out -- is visual docs
// exports.webpack = function (config, opts) {}
