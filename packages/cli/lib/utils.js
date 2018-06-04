const { existsSync, statSync } = require('fs');

exports.isDir = function (str) {
	return existsSync(str) && statSync(str).isDirectory();
}
