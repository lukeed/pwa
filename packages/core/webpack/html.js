const { readdirSync } = require('fs');
const { join, relative } = require('path');

const fallback = join(__dirname, 'template.ejs');

module.exports = function (src, opts) {
	let config = {};

	let rgx = /index\.(html|hbs|ejs)$/;
	let template = opts.template || readdirSync(src).find(x => rgx.test(x));
	config.template = template || relative(src, fallback);

	config.minify = opts.production && {
		removeComments: true,
		collapseWhitespace: true,
		removeRedundantAttributes: true,
		removeStyleLinkTypeAttributes: true,
		removeScriptTypeAttributes: true
	};

	return config;
}
