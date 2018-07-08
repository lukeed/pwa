const webpack = require('@pwa/core');
const format = require('webpack-format-messages');

module.exports = function (src, opts) {
	opts.production = true;
	webpack(src, opts).run((err, stats) => {
		let msgs = format(stats);
		console.log(msgs);
	});
}
