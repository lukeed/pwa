const { join } = require('path');

module.exports = function (dir, isProd) {
	return {
		context: dir,
		output: {
			path: distDir,
			publicPath: '/assets/',
			filename: isProd ? '[name].[hash:8].js' : '[name].js',
			chunkFilename: isProd ? '[name].chunk.[chunkhash:5].js' : '[name].chunk.js'
		},
		mode: isProd ? 'production' : 'development',
		resolve: {
			alias: {
				// locals
				'@': dir,
				'@tags': join(dir, 'tags'),
				'@assets': join(dir, 'assets'),
				'@components': join(dir, 'components'),
				'@static': join(dir, 'static'),
				'@pages': join(dir, 'pages'),
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
		plugins: [
			// new webpack.NoEmitOnErrorsPlugin(),
		].concat(isProd ? [
			new webpack.HashedModuleIdsPlugin(),
			new webpack.LoaderOptionsPlugin({ minimize:true })
		] : [
			new webpack.HotModuleReplacementPlugin()
		]),
		devtool: isProd && 'source-map'
	};
}
