const { join } = require('path');
const webpack = require('webpack');
const OptimizeCSS = require('optimize-css-assets-webpack-plugin');
const HTML = require('html-webpack-plugin');
const toHTMLConfig = require('./html');

module.exports = function (src, config, opts) {
	let isProd = opts.production;
	let bundle = ['./index.js'];

	let { babel, browsers, postcss } = config;

	// Apply "browserlist" to Babel config
	babel.presets = babel.presets.map(x => {
		if (!Array.isArray(x) || x[0] !== 'env') return x;
		x[1].targets = Object.assign({ browsers }, x[1].targets);
		return x;
	});

	// Construct Style rules
	let styles = require('./style')(browsers, postcss, opts);

	if (!isProd) {
		bundle.push(
			require.resolve('webpack-dev-server/client'),
			require.resolve('webpack/hot/dev-server')
		);
	}

	return {
		context: src,
		entry: { bundle },
		output: {
			publicPath: '/',
			path: join(opts.cwd, 'build'),
			filename: isProd ? '[name].[hash:8].js' : '[name].js',
			chunkFilename: isProd ? '[name].chunk.[chunkhash:5].js' : '[name].chunk.js'
		},
		mode: isProd ? 'production' : 'development',
		resolve: {
			alias: {
				// locals
				'@': src,
				'@tags': join(src, 'tags'),
				'@assets': join(src, 'assets'),
				'@components': join(src, 'components'),
				'@static': join(src, 'static'),
				'@pages': join(src, 'pages'),
			}
		},
		node: {
			process: false
		},
		performance: {
			maxAssetSize: 2e5, // 200kb
			maxEntrypointSize: 2e5,
			hints: isProd && 'warning',
			assetFilter: str => !(/\.map|mp4|ogg|mov|webm$/.test(str)),
		},
		module: {
			rules: [{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				options: babel
			}].concat(styles.rules)
		},
		devtool: isProd && 'source-map',
		plugins: [
			// new webpack.NoEmitOnErrorsPlugin(),
			new HTML(toHTMLConfig(src, opts))
		].concat(styles.plugins, isProd ? [
			new webpack.HashedModuleIdsPlugin(),
			new webpack.LoaderOptionsPlugin({ minimize:true })
		] : [
			new webpack.NamedModulesPlugin(),
			new webpack.HotModuleReplacementPlugin()
		]),
		optimation: {
			minimizer: [
				// TODO: UglifyJS
				new OptimizeCSS({})
			]
		}
	};
}
