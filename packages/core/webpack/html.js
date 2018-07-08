const { readdirSync } = require('fs');

module.exports = function (src, opts) {
	let config = {};
	let rgx = /index\.(html|hbs|ejs)$/;
	let template = opts.template || readdirSync(src).find(x => rgx.test(x));
	template !== void 0 && (config.template = template);

	config.minify = opts.production && {
		removeComments: true,
		collapseWhitespace: true,
		removeRedundantAttributes: true,
		removeStyleLinkTypeAttributes: true,
		removeScriptTypeAttributes: true
	};

	return config;
}
