const $ = require('kleur');

const PWA = $.bold('[PWA]');
const SPACER = ' '.repeat(6); // "[PWA] "
const RGX = /(@pwa\/(.*))($|\s)/g; //~> @pwa/foo-bar

function print(color, msg) {
	console.log($[color](PWA), msg.includes('\n') ? msg.replace(/(\r?\n)/g, '$1' + SPACER) : msg);
}

exports.log = print.bind(null, 'white');
exports.info = print.bind(null, 'cyan');
exports.success = print.bind(null, 'green');
exports.warn = print.bind(null, 'yellow');
exports.error = print.bind(null, 'red');

exports.bail = msg => {
	exports.error(msg);
	process.exit(1);
};

exports.logger = msg => {
	exports.info(msg.includes('@pwa') ? msg.replace(RGX, $.magenta().underline('$1')) : msg);
};
