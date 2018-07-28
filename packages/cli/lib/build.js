module.exports = function (src, opts) {
	opts.production = true;
	require('@pwa/core')(src, opts).run((err, stats) => {
		let msgs = require('webpack-format-messages')(stats);
		console.log(msgs);
	});
}
