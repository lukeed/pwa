const { existsSync, statSync } = require('fs');

exports.isDir = function (str) {
	return existsSync(str) && statSync(str).isDirectory();
}

exports.toFile = function (str) {
	return existsSync(str) && require(str);
}
