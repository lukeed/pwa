const { VueLoaderPlugin } = require('vue-loader')

exports.babel = function (config, opts) {
	config.plugins = (config.plugins || []).concat([
		require.resolve('babel-plugin-transform-decorators-legacy'),
		require.resolve('babel-plugin-transform-object-rest-spread'),
		require.resolve('babel-plugin-transform-class-properties'
	]);
}

exports.uglify = {
	cache: true,
	parallel: true,
	sourceMap: true,
	uglifyOptions: {
		sourceMap: true,
		output: {
			comments: false
		},
		mangle: true,
		compress: {
			warnings: false
		}
	}
}

exports.webpack = function (config, opts) {
	if (config.resolve.extensions) {
		config.resolve.extensions.push('.vue');
	} else {
		config.resolve.extensions = ['.wasm', '.mjs', '.js', '.json', '.vue'];
	}

	Object.assign(config.resolve.alias, {
		'vue$': 'vue/dist/vue.esm.js'
	});

	// replace "style-loader" w/ "vue-style-loader"
	config.module.rules.forEach(obj => {
		if (Array.isArray(obj.use)) {
			obj.use = obj.use.map(x => x === 'style-loader' ? 'vue-style-loader' : x);
		}
	});

	config.module.rules.unshift({
		test: /\.vue$/,
		loader: 'vue-loader'
	});

	config.plugins.push(
		new VueLoaderPlugin({
			productionMode: opts.production
		})
	);
}
