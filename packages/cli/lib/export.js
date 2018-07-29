const log = require('../log');
module.exports = function (src, opts) {
	opts.export = opts.production = true;
	opts.logger = log.logger;
	require('@pwa/core')(src, opts).run((err, stats) => {
		console.log('> format messages');
	});
}
