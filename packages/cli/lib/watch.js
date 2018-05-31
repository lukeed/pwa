const webpack = require('./webpack');

module.exports = function (src, opts) {
	webpack(src, opts).watch((err, stats) => {
		console.log('> format messages');
	});
}
