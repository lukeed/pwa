const { resolve } = require('path');

module.exports = function (src, opts) {
	src = resolve(src || '.');
	console.log('> [watch] ', src, opts);
}
