exports.eslint = {
	cache: true,
	parserOptions: {
		ecmaVersion: 10,
		parser: 'babel-eslint',
		sourceType: 'module',
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
