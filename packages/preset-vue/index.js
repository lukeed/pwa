const { VueLoaderPlugin } = require('vue-loader')

exports.babel = function (config, opts) {
	config.plugins = (config.plugins || []).concat([
		[require.resolve('@babel/plugin-proposal-decorators'), { legacy:true }],
		require.resolve('@babel/plugin-proposal-object-rest-spread'),
		require.resolve('@babel/plugin-proposal-class-properties')
	]);
}

exports.webpack = function (config, opts) {
	config.resolve.extensions.push('.vue');

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
