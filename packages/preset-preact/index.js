exports.babel = function (config, opts) {
	let pragma = 'h';
	config.plugins = (config.plugins || []).concat([
		require.resolve('@babel/plugin-transform-react-constant-elements'),
		require.resolve('@babel/plugin-proposal-object-rest-spread'),
		[require.resolve('@babel/plugin-proposal-decorators'), { legacy:true }],
		require.resolve('@babel/plugin-proposal-class-properties'),
		[require.resolve('@babel/plugin-transform-react-jsx'), { pragma }]
	]);
	if (opts.production) config.plugins.push(
		require.resolve('babel-plugin-transform-react-remove-prop-types')
	);
}

exports.terser = {
	cache: true,
	parallel: true,
	sourceMap: true,
	terserOptions: {
		sourceMap: true,
		output: {
			comments: false
		},
		mangle: true,
		compress: {
			properties: true,
			keep_fargs: false,
			pure_getters: true,
			collapse_vars: true,
			warnings: false,
			sequences: true,
			dead_code: true,
			drop_debugger: true,
			comparisons: true,
			conditionals: true,
			evaluate: true,
			booleans: true,
			loops: true,
			unused: true,
			hoist_funs: true,
			if_return: true,
			join_vars: true,
			drop_console: false,
			pure_funcs: [
				'classCallCheck',
				'_classCallCheck',
				'_possibleConstructorReturn',
				'Object.freeze',
				'invariant',
				'warning'
			]
		}
	}
}

exports.webpack = function (config, opts) {
	// Preact 8.x vs Preact X
	let compat = 'preact-compat';
	let preact = 'preact';

	try {
		require.resolve('preact/compat');
		compat = 'preact/compat';
	} catch (err) {
		if (opts.production) {
			preact = 'preact/dist/preact.min.js';
		}
	}

	// Apply aliases
	Object.assign(config.resolve.alias, {
		'react': compat,
		'react-dom': compat,
		'preact': preact,
		'preact-compat': compat,
		'react-addons-css-transition-group': 'preact-css-transition-group',
		'create-react-class': 'preact-compat/lib/create-react-class'
	});

	// Attach `async!` loader
	config.resolveLoader = config.resolveLoader || {};
	config.resolveLoader.alias = config.resolveLoader.alias || {};
	config.resolveLoader.alias.async = require.resolve('@preact/async-loader');
}
