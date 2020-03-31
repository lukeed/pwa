// @see https://github.com/Klathmon/imagemin-webpack-plugin#api
exports.imagemin = {
	test: /\.(svg|jpe?g|png|gif)$/i,
}

exports.webpack = function (config, env, opts) {
	// disable during HMR/development
	opts.imagemin.disable = !env.production;

	if (!opts.imagemin.disable) {
		const ImageMin = require('imagemin-webpack-plugin').default;
		config.plugins.unshift(new ImageMin(opts.imagemin));
	}
}
