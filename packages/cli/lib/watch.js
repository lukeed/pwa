const { join } = require('path');
const Server = require('webpack-dev-server');
const webpack = require('./webpack');

const { HOST, PORT } = process.env;

module.exports = function (src, opts) {
	let c = webpack(src, opts);
	let cwd = opts.cwd; // mutated
	src = c.options.context; // src vs root
	let publicPath = c.options.output.publicPath;

	let server = new Server(c, {
		hot: true,
		publicPath,
		quiet: true,
		inline: true,
		compress: true,
		contentBase: src,
		historyApiFallback: true,
		disableHostCheck: true,
		watchOptions: {
			ignored: [
				join(cwd, 'build'),
				join(cwd, 'node_modules')
			]
		}
	});

	server.listen(PORT || opts.port, HOST || opts.host, err => {
		console.log('> err?', err);
	});
}
