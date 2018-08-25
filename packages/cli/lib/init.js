const colors = require('kleur');
const templite = require('templite');
const { existsSync, readFileSync } = require('fs');
const { format, join, parse, resolve } = require('path');
const { writer } = require('./util/fs');
const log = require('./util/log');

const templates = join(__dirname, '..', 'templates');

let BULLETS = [];
let toLower = x => (x || '').toLowerCase();
let presets = ['Angular', 'Preact', 'React', 'Svelte', 'Vue'];

function toChoices(arr, isMulti) {
	return arr.map((title, idx) => {
		let value = (!isMulti && idx == 0) ? 'none' : title.replace(/\s+/g, '-').toLowerCase();
		return { title, value };
	});
}

function setValue(key, val) {
	for (let i=0; i < BULLETS.length; i++) {
		if (BULLETS[i].name === key) BULLETS[i].initial=val;
	}
}

function toRouter(obj) {
	return /react|vue/.test(obj.preset) ? `${obj.preset}-router` : 'navaid';
}

module.exports = function (type, dir, opts) {
	let prompts = require('prompts');

	BULLETS = [
		{
			name: 'preset',
			type: 'select',
			message: 'Which framework would you like to use?',
			choices: toChoices(['None'].concat(presets)),
			format: val => val !== 'none' && val
		}, {
			name: 'features',
			type: 'multiselect',
			message: 'Select features needed for your project:',
			choices: toChoices(['CSS Preprocessor', 'Linter or Formatter', 'TypeScript', 'Router', 'Service Worker', 'E2E Testing', 'Unit Testing'], true)
		}, {
			name: 'styles',
			message: 'Which CSS preprocessor?',
			type: (_, all) => all.features.includes('css-preprocessor') && 'select',
			choices: toChoices(['None', 'LESS', 'SASS/SCSS', 'Stylus']),
			format: val => val === 'none' ? false : val.includes('sass') ? 'sass' : val
		}, {
			name: 'linter',
			message: 'Which linter / formatter do you like?',
			type: (_, all) => all.features.includes('linter-or-formatter') && 'select',
			choices: toChoices(['None', 'ESLint', 'Prettier', 'TSLint']),
			format: val => val === 'none' ? false : val
		}, {
			name: 'sw',
			message: 'Which Service Worker library?',
			type: (_, all) => all.features.includes('service-worker') && 'select',
			choices: toChoices(['None', 'Custom', 'Offline Plugin', 'SW Precache', 'SW Workbox']),
			format(val, all) {
				all.swCustom = val == 'custom';
				if (val === 'none') return false;
				if (val === 'custom') return 'register-service-worker';
				if (val === 'sw-workbox') return 'workbox-webpack-plugin';
				if (val === 'sw-precache') return 'sw-precache-webpack-plugin';
				return val;
			}
		}, {
			initial: true,
			name: 'router',
			type: (_, all) => all.features.includes('router') && 'confirm',
			message: (_, all) => `Accept \`${toRouter(all)}\` as your application router?`,
			format: (val, all) => val && toRouter(all) // Boolean|String
		},
		// TODO: Testing options
		{
			name: 'dir',
			type: 'text',
			message: 'Directory to use',
			format: x => resolve('.', x)
		}, {
			name: 'cwd',
			type: dir => dir === resolve('.') && 'confirm',
			message: 'Are you sure you want to write into the current directory?'
		}, {
			name: 'dir', // repeat/overwrite
			format: x => resolve('.', x),
			type: x => x === false && 'text',
			message: 'OK. Please provide another directory.'
		}, {
			name: 'force',
			message: 'Force destination overwrite?',
			type: (_, all) => existsSync(all.dir) && 'confirm',
			format: (x, all) => (all.exists=1,x) // bcuz it ran
		}
	];

	dir = dir || '.';
	setValue('dir', dir);

	if (type=toLower(type)) {
		let idx = presets.map(toLower).indexOf(type);
		if (idx === -1) return console.log('[TODO] Unknown framework:', type);
		setValue('preset', ++idx);
	}

	if (opts.force) {
		log.warn(`Detected ${colors.cyan('--force')} flag; target directory will be overwritten!`);
		prompts.inject({ force:true });
	}

	let ok = true;
	let onCancel = () => ok=false;
	return prompts(BULLETS, { onCancel }).then(argv => {
		if (!ok) {
			log.info(`Received ${colors.cyan.underline('CTRL+C')} command`);
			return log.log(`Exited ${colors.dim('$ pwa init')} setup`);
		}

		console.log(argv);
		if (argv.exists && !argv.force) {
			return log.error(`Refusing to overwrite existing directory.\nPlease specify a different destination or use the ${colors.cyan('--force')} flag.`);
		}

		let dest = argv.dir;

		// Construct `package.json` file
		let pkg = { private:true };
		let deps = ['sirv-cli', 'ganalytics'];
		let isSFC = /svelte|vue/.test(argv.preset);
		let devdeps = ['@pwa/cli']

		let template = argv.preset || 'vanilla';
		let styleDir = argv.styles || 'css';

		if (styleDir === 'sass') {
			devdeps.push('node-sass', 'sass-loader');
		} else if (styleDir !== 'css') {
			devdeps.push(styleDir, `${styleDir}-loader`);
		}

		if (argv.router) {
			deps.push(argv.router);
			template += '-router';
			styleDir += '-router';
		}

		if (argv.swCustom) {
			deps.push(argv.sw);
		} else if (argv.sw) {
			devdeps.push(argv.sw);
		}

		if (argv.preset) {
			deps.push(argv.preset);
			devdeps.push(`@pwa/preset-${argv.preset}`);
		}

		pkg.scripts = {
			build: 'pwa export',
			start: 'sirv build -s',
			watch: 'pwa watch'
		};

		pkg.dependencies = {};
		deps.sort().forEach(str => {
			pkg.dependencies[str] = 'latest';
		});

		pkg.devDependencies = {};
		devdeps.sort().forEach(str => {
			pkg.devDependencies[str] = 'latest';
		});

		// Write "package.json" file
		let file = join(dest, 'package.json');
		writer(file).end(JSON.stringify(pkg, null, 2));

		// Loop: Read ~> Inject ~> Write
		const glob = require('tiny-glob/sync');

		let order = [template];
		isSFC || order.push(styleDir);

		let data = {
			style: styleDir
		};

		// working w/ "src" files only now
		dest = join(dest, 'src');

		function toFilename(str, dest) {
			if (isSFC || /index/i.test(str)) return join(dest, str);
			let { dir, name, ext } = parse(str);
			dir = join(dest, dir, name);
			name = 'index';
			return format({ dir, name, ext });
		}

		order.forEach(dir => {
			let cwd = join(templates, dir);
			glob('**/*.*', { cwd }).forEach(x => {
				let file = toFilename(x, dest);
				let src = readFileSync(join(cwd, x), 'utf8');
				writer(file).end(templite(src, data));
			});
		});

		console.log('[TODO] scaffold template files');
	});
}
