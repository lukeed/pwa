module.exports = function (src, opts) {
	opts.export = opts.production = true;
	require('@pwa/core')(src, opts).run((err, stats) => {
		console.log('> format messages');
	});
}
