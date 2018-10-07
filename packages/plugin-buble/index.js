exports.buble = {
	transforms: {
		modules: false
	}
}

exports.webpack = function (config, env, opts) {
	if (!opts.buble.target) {
		let i=0, tar={}, key, ver;
		let browsers = opts.browsers; // results
		let supported = ['chrome', 'edge', 'ie', 'safari', 'firefox'];
		for (; i < browsers.length; i++) {
			[key, ver] = browsers[i].split(' ');
			if (!supported.includes(key)) continue;
			tar[key] = tar[key] ? Math.min(tar[key], +ver) : +ver;
		}
		opts.buble.target = tar;
	}

	// replace "babel-loader" w/ "buble-loader"
	let idx = config.module.rules.findIndex(x => x.loader === 'babel-loader');
	config.module.rules[idx].loader = 'buble-loader';
	config.module.rules[idx].options = opts.buble;
}
