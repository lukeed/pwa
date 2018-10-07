const { join } = require('path');
const InlineSource = require('html-webpack-inline-source-plugin');

exports.babel = function (config) {
	config.plugins.push(
		[require('babel-plugin-transform-react-jsx'), {
			pragma: 'h'
		}]
	);
}

exports.webpack = function (config, env) {
	config.resolve.alias.zak = join(env.src, 'lib/zak');
	if (env.production) {
		config.devtool = false;
		let HTML = config.plugins[0];
		HTML.options.inlineSource = /\.css$/;
		config.plugins.push(new InlineSource());
	}
}
