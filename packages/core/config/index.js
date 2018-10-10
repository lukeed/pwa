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
	modules: true,
	importLoaders: 1,
	localIdentName: '[local]__[hash:base64:5]'
}

// Any PostCSS config
// ~> "strings" will be required
exports.postcss = {
	plugins: ['autoprefixer']
}

// Basic config
// TODO: configure `sourceMap` (globally)
exports.terser = {
	cache: true,
	parallel: true,
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
