const { join } = require('path');
const { readdirSync } = require('fs');

module.exports = function (src, opts, env) {
	if (!env.production) {
		opts.minify = false;
	}

	if (env.template) {
		opts.template = env.template;
	} else if (!opts.template) {
		let rgx = /index\.(html|hbs|ejs)$/;
		let file = readdirSync(src).find(x => rgx.test(x));
		opts.template = file ? join(src, file) : join(__dirname, 'template.ejs');
	}

	if (!/([!]|-loader)/i.test(opts.template)) {
		opts.template = '!!ejs-loader!' + opts.template;
	}

	return opts;
}
