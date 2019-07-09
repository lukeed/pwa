const $ = require('kleur');

const PWA = $.bold('[PWA]');
const SPACER = ' '.repeat(6); // "[PWA] "
const RGX = /(@pwa\/(.*))($|\s)/g; //~> @pwa/foo-bar

function print(color, msg) {
	console.log($[color](PWA), msg.includes('\n') ? msg.replace(/(\r?\n)/g, '$1' + SPACER) : msg);
}

exports.log = print.bind(null, 'white');
exports.warn = print.bind(null, 'yellow');
exports.success = print.bind(null, 'green');
exports.info = print.bind(null, 'cyan');

exports.error = (msg, code=1) => {
	print('red', msg);
	process.exit(code);
};

exports.logger = msg => {
	exports.info(msg.includes('@pwa') ? msg.replace(RGX, $.magenta().underline('$1')) : msg);
};
