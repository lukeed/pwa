const fs = require('fs');
const colors = require('kleur');
const templite = require('templite');
const glob = require('tiny-glob/sync');
const { format, join, parse, resolve } = require('path');
const { writer } = require('./util/fs');
const log = require('./util/log');

const templates = join(__dirname, '..', 'templates');

let BULLETS = [];
let toLower = x => (x || '').toLowerCase();
let presets = ['Preact', 'React', 'Svelte', 'Vue'];
// TODO: Angular, Polymer

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

function toRouter(preset) {
	return /react|vue/.test(preset) ? `${preset}-router` : 'navaid';
}

/**
 * Convert "App.{ext}" ~> "App/index.{ext}"
 * @param  {String} str   The original filename
 * @param  {String} dest  The (absolute) target directory
 * @return {String}
 */
function toAppFile(str, dest) {
	let { dir, name, ext } = parse(str);
	dir = join(dest, dir, name);
	name = 'index';
	return format({ dir, name, ext });
}

/**
 * Copy `templates/{dir}/**` ~> `${dest}/**`
 * @param  {String} dir   The "templates" dirname
 * @param  {String} dest  The target destination
 * @param  {Object} data  The data to inject
 */
function copyDir(dir, dest, data) {
	let cwd = join(templates, dir);
	let isRaw = /svelte|vue|assets/i.test(cwd);
	glob('**/*.*', { cwd }).forEach(x => {
		let file = (isRaw || /index/i.test(x)) ? join(dest, x) : toAppFile(x, dest);
		let src = fs.readFileSync(join(cwd, x), 'utf8');
		writer(file).end(templite(src, data));
	});
}

function copyFile(src, tar, name) {
	let rr = fs.createReadStream(join(src, name));
	return rr.pipe(writer(join(tar, name)));
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
			type: (_, all) => fs.existsSync(all.dir) && 'confirm',
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

		// console.log(argv);

		if (argv.exists && !argv.force) {
			return log.error(`Refusing to overwrite existing directory.\nPlease specify a different destination or use the ${colors.cyan('--force')} flag.`);
		}

		let dest = argv.dir;

		// Construct `package.json` file
		let pkg = { private:true };
		let deps = ['sirv-cli', 'ganalytics'];
		let devdeps = ['@pwa/cli']

		let styleDir = argv.styles || 'css';
		let template = argv.preset || 'vanilla';
		let styleExt = styleDir.replace('us', '');

		if (styleDir === 'sass') {
			devdeps.push('node-sass', 'sass-loader');
		} else if (styleDir !== 'css') {
			devdeps.push(styleDir, `${styleDir}-loader`);
		}

		if (argv.features.includes('router')) {
			deps.push(toRouter(argv.preset));
			template += '-router';
			styleDir += '-router';
		}

		if (argv.swCustom) {
			deps.push(argv.sw);
		} else if (argv.sw) {
			devdeps.push(argv.sw);
		}

		if (argv.preset) {
			devdeps.push(`@pwa/preset-${argv.preset}`);
			(/svelte/.test(argv.preset) ? devdeps : deps).push(argv.preset);
			if (argv.preset === 'react') deps.push('react-dom');
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

		// Copy `.gitignore` to start us off
		copyFile(templates, dest, '.gitignore');

		// working w/ "src" files only now
		dest = join(dest, 'src');

		// The injectable template data
		let data = { style:styleExt };

		// Copy over `index.html` template
		copyFile(templates, dest, 'index.html');

		// Copy "templates/assets" over
		copyDir('assets', join(dest, 'assets'));

		// (SFCs) Inject "styleDir" content
		if (/vue|svelte/.test(template)) {
			let tmpl = join(templates, template);
			let styl = join(templates, styleDir);

			let ext = template.includes('vue') ? 'vue' : 'html';
			let rgx = new RegExp(`\\.${ext}$`);

			// Copy `index` style (no pair below)
			copyFile(styl, dest, `index.${styleExt}`);

			// Copy over SFCs, injecting styles
			glob('**/*.*', { cwd:tmpl }).forEach(x => {
				let src = fs.readFileSync(join(tmpl, x), 'utf8');
				let out = writer(join(dest, x));
				let tmp = templite(src, data);

				if (/index/.test(x)) {
					out.end(tmp);
				} else {
					// find Component's paired stylesheet
					let css = join(styl, x.replace(rgx, `.${styleExt}`));
					css = fs.readFileSync(css, 'utf8').trim().replace(/\n/g, '\n\t');
					out.end(tmp.replace('%%__styles__%%', css));
				}
			});
		} else {
			// Copy files as they are
			// ~> w/ filename transforms
			copyDir(template, dest, data);
			copyDir(styleDir, dest, data);
		}

		let dir = parse(argv.dir).base;
		let txt = argv.preset ? (colors.magenta.underline(argv.preset) + ' ') : '';
		let msg = `Created a new ${txt}project within ${ colors.green.bold(dir) } 🎉\n`;

		msg += '\nInside this directory, you may:\n';
		msg += '\n – Develop within a live-reload server:';
		msg += `\n    ${colors.dim('$ pwa watch')}\n`;
		msg += '\n – Build your application for production:';
		msg += `\n    ${colors.dim('$ pwa build')}\n`;
		msg += '\n – Export routes\' HTML for static hosting:';
		msg += `\n    ${colors.dim('$ pwa export')}\n`;
		msg += '\n – Start a production HTTP file server:';
		msg += `\n    ${colors.dim('$ npm start')}\n`;

		msg += `\nThese commands have been added to your ${colors.white.underline('package.json')} already.`;
		msg += '\nWe suggest you begin by typing:\n';
		msg += '\n  ' + colors.dim(`$ cd ${dir}`);
		msg += `\n  ${colors.dim('$ npm install')}`;
		msg += `\n  ${colors.dim('$ npm run watch')}`;

		msg += `\n\nDocumentation can be found at ${colors.white.bold.underline('https://pwa.cafe/docs')}`;

		log.success(msg);
		log.success('Enjoy! 😍');
	});
}
