exports.eslint = {
	cache: true,
	parserOptions: {
		parser: 'babel-eslint'
	}
}

exports.webpack = function (config, env, opts) {
	config.module.rules.unshift({
    enforce: 'pre',
    test: /\.jsx?$/,
    include: env.src,
    loader: 'eslint-loader',
    options: opts.eslint
  });
}
