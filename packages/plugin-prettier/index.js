exports.eslint = {
	cache: true
}

exports.webpack = function (config, env, opts) {
	config.module.rules.unshift({
    test: /\.jsx$/,
    enforce: 'pre',
    include: env.src,
    loader: 'eslint-loader',
    options: opts.eslint
  });
}
