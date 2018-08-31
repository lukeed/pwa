exports.prettier = {
	parser: 'babylon'
}

exports.webpack = function (config, env, opts) {
	config.module.rules.unshift({
    enforce: 'pre',
    test: /\.jsx?$/,
    include: env.src,
    loader: 'prettier-loader',
    options: opts.prettier
  });
}
