exports.babel = {
	babelrc: false,
	cacheDirectory: true,
	presets: [
		['env', {
			loose: true,
			modules: false,
			targets: {
				uglify: true,
				// "browsers" are injected
			},
			exclude: [
				'transform-regenerator',
				'transform-es2015-typeof-symbol'
			]
		}]
	],
	plugins: [
		require.resolve('@babel/plugin-syntax-dynamic-import')
	]
}

// @see https://jamie.build/last-2-versions
exports.browsers = [
	'>0.25%',
	'not ie 11',
	'not op_mini all'
]

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
