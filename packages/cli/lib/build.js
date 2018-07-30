const log = require('./util/log');

module.exports = function (src, opts) {
	opts.production = true;
	opts.logger = log.logger;
	require('@pwa/core')(src, opts).run((err, stats) => {
		let msgs = require('webpack-format-messages')(stats);
		console.log(msgs);
	});
}
