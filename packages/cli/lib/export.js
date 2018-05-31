const webpack = require('./webpack');

module.exports = function (src, opts) {
	opts.export = opts.production = true;
	webpack(src, opts).run((err, stats) => {
		console.log('> format messages');
	});
}
