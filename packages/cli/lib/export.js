const { resolve } = require('path');

module.exports = function (src, opts) {
	src = resolve(src || '.');
	console.log('> [export] ', src, opts);
}
