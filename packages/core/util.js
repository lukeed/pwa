const { resolve } = require('path');
const { existsSync, statSync } = require('fs');

exports.isDir = function (str) {
	return existsSync(str) && statSync(str).isDirectory();
}

exports.load = function (str, dir) {
	str = resolve(dir || '.', str);
	return existsSync(str) && require(str);
}

exports.merge = function (old, nxt, args) {
	if (!nxt) return;
	for (let k in old) {
		if (typeof nxt[k] === 'function') {
			nxt[k](old[k], args); // expect mutate
		} else {
			old[k] = nxt[k] || old[k];
		}
	}
}

exports.isEmpty = function (mix) {
	return Object.keys(mix).length == 0;
}
