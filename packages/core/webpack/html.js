const { join } = require('path');
const { readdirSync } = require('fs');

module.exports = function (src, opts) {
	let config = {};
	let rgx = /index\.(html|hbs|ejs)$/;
	let template = opts.template || readdirSync(src).find(x => rgx.test(x));
	config.template = template || join(__dirname, 'template.html');

	config.minify = opts.production && {
		removeComments: true,
		collapseWhitespace: true,
		removeRedundantAttributes: true,
		removeStyleLinkTypeAttributes: true,
		removeScriptTypeAttributes: true
	};

	return config;
}
