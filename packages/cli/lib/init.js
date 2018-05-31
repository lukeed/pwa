const { resolve } = require('path');

module.exports = function (type, dest, opts) {
	dest = resolve(dest || '.');
}
