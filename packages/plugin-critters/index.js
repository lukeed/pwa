const Critters = require('critters-webpack-plugin');

exports.critters = {
	// @see https://github.com/GoogleChromeLabs/critters#options
}

exports.webpack = function (config, _, opts) {
	config.plugins.push(
		new Critters(opts.critters)
	);
}
