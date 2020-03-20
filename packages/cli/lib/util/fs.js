const { createWriteStream } = require('fs');
const { dirname, normalize, resolve } = require('path');
const totalist = require('totalist/sync');
const mkdirp = require('mkdirp');

exports.writer = function (file) {
	file = normalize(file);
	mkdirp.sync(dirname(file));
	return createWriteStream(file);
}

exports.glob = function (dir, opts={}) {
	let out = [], dotfiles = !!opts.dotfiles;
	if (opts.cwd) dir = resolve(opts.cwd, dir);
	totalist(dir, (rel, abs, stats) => {
		if (!dotfiles && /(^\.)|\/\./.test(rel)) return;
		out.push({ rel, abs, stats });
	});
	return out;
}
