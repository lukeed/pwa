const { createWriteStream } = require('fs');
const { dirname, normalize } = require('path');
const mkdirp = require('mkdirp');

exports.writer = function (file) {
	file = normalize(file);
	mkdirp.sync(dirname(file));
	return createWriteStream(file);
}
