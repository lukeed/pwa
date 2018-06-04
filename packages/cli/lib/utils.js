const { statSync, existsSync } = require('fs');

exports.isDir = function (str) {
	return existsSync(str) && statSync(str).isDirectory();
}
