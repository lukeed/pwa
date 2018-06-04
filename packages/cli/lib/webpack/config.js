const { join } = require('path');
const webpack = require('webpack');

module.exports = function (src, opts) {
	let isProd = opts.production;

	return {
		context: src,
		entry: {
			bundle: './index.js'
		},
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
			rules: []
		},
		devtool: isProd && 'source-map',
		plugins: [
			// new webpack.NoEmitOnErrorsPlugin(),
		].concat(isProd ? [
			new webpack.HashedModuleIdsPlugin(),
			new webpack.LoaderOptionsPlugin({ minimize:true })
		] : [
			new webpack.HotModuleReplacementPlugin()
		])
	};
}
