exports.babel = {
	babelrc: false,
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
		require.resolve('babel-plugin-syntax-dynamic-import')
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
	plugins: { autoprefixer:{} }
}

// Empty ~> no customization
exports.uglify = {}

// Leave this commented out -- is visual docs
// exports.webpack = function (config, opts) {}
