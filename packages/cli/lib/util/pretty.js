const UNITS = ['B ', 'kB', 'MB', 'GB'];

exports.size = function (val) {
	let exp = Math.min(Math.floor(Math.log10(val) / 3), UNITS.length - 1);
	let out = (val / Math.pow(1e3, exp)).toPrecision(3);
	let idx = out.indexOf('.');
	// ensure non-byte unit has 2 decimal
	if (exp > 0 && idx === -1) {
		out += '.00';
	} else if (exp > 0 && (out.length - idx - 1 !== 2)) {
		out = (out + '00').substring(0, idx + 3); // 2 + 1 for 0-based
	}
	return out + ' ' + UNITS[exp];
}

exports.time = function (ms) {
	return (ms / 1e3).toFixed(2) + 's';
}
