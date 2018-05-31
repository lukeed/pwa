const webpack = require('./webpack');

module.exports = function (src, opts) {
	opts.production = true;
	webpack(src, opts).run((err, stats) => {
		console.log('> format messages');
	});
}
