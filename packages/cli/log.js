const $ = require('kleur');

const PWA = $.bold('[PWA]');
const SPACER = ' '.repeat(6); // "[PWA] "

function print(color, msg) {
	console.log($[color](PWA), msg.includes('\n') ? msg.replace(/(\r?\n)/g, '$1' + SPACER) : msg);
}

exports.log = print.bind(null, 'white');
exports.warn = print.bind(null, 'yellow');
exports.success = print.bind(null, 'green');
exports.info = print.bind(null, 'cyan');
exports.error = print.bind(null, 'red');
