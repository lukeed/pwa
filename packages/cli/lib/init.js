const fs = require('fs');
const colors = require('kleur');
const templite = require('templite');
const { format, join, parse, resolve } = require('path');
const { glob, writer } = require('./util/fs');
const log = require('./util/log');

const templates = join(__dirname, '..', 'templates');

let BULLETS = [];
let toLower = x => (x || '').toLowerCase();
let presets = ['Preact', 'React', 'Svelte', 'Vue'];
// TODO: Angular, Polymer

// Things we scaffold
const versions = {
	'ganalytics': '^3.0.0',
	'less': '^3.8.0',
	'less-loader': '^4.1.0',
	'navaid': '^1.0.0',
	'node-sass': '^4.9.0',
	'preact': '^8.3.0',
	'preact-router': '^2.6.0',
	'preact-compat': '^3.18.0',
	'react': '^16.5.0',
	'react-dom': '^16.5.0',
	'react-loadable': '^5.5.0',
	'react-router': '^4.3.0',
	'react-router-dom': '^4.3.0',
	'sass-loader': '^7.1.0',
	'sirv-cli': '^0.4.0',
	'stylus': '^0.54.0',
	'stylus-loader': '^3.0.0',
	'svelte': '^3.1.0',
	'vue': '^2.5.0',
	'vue-router': '^3.0.0'
};

function toChoices(arr, isMulti) {
	return arr.map((title, idx) => {
		let value = (!isMulti && idx == 0) ? 'none' : title.replace('é', 'e').replace(/\s+/g, '-').toLowerCase();
		return { title, value };
	});
}

function setValue(key, val) {
	for (let i=0; i < BULLETS.length; i++) {
		if (BULLETS[i].name === key) BULLETS[i].initial=val;
	}
}

function toRouter(preset) {
	let str = /react|vue/.test(preset) ? `${preset}-router` : 'navaid';
	if (preset === 'react') str += '-dom';
	return str;
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
	glob(cwd).forEach(({ rel, abs }) => {
		let file = (isRaw || /index/i.test(rel)) ? join(dest, rel) : toAppFile(rel, dest);
		let src = fs.readFileSync(abs, 'utf8');
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
			choices(val) {
				let arr = ['Compression', 'CSS Preprocessor', 'Linter or Formatter (TODO)', 'TypeScript (TODO)'];
				val || arr.push('Bublé'); // only if no preset
				return toChoices(arr.concat('Router', 'Service Worker', 'E2E Testing (TODO)', 'Unit Testing (TODO)'), true);
			}
		}, {
			name: 'compress',
			message: 'Which compression format?',
			type: (_, all) => all.features.includes('compression') && 'select',
			choices: toChoices(['None', 'Brotli', 'GZip', 'Zopfli']),
			format: val => val !== 'none' && val
		}, {
			name: 'styles',
			message: 'Which CSS preprocessor?',
			type: (_, all) => all.features.includes('css-preprocessor') && 'select',
			choices: toChoices(['None', 'LESS', 'SASS/SCSS', 'Stylus']),
			format: val => val === 'none' ? false : val.includes('sass') ? 'sass' : val
		}, {
			name: 'linter',
			message: '(TODO) Which linter / formatter do you like?',
			type: (_, all) => all.features.some(x => /linter-or-formatter/.test(x)) && 'select',
			choices: toChoices(['None', 'ESLint', 'Prettier', 'TSLint']),
			format: val => val !== 'none' && val
		}, {
			name: 'sw',
			message: 'Which Service Worker library?',
			type: (_, all) => all.features.includes('service-worker') && 'select',
			choices: toChoices(['None', 'Offline Plugin', 'SW Precache', 'SW Workbox']),
			format(val) {
				if (val === 'none') return false;
				// if (val === 'custom') return (all.swCustom=true,false); TODO
				if (val === 'offline-plugin') return '@pwa/plugin-offline';
				if (val === 'sw-precache') return '@pwa/plugin-sw-precache';
				if (val === 'sw-workbox') return '@pwa/plugin-sw-workbox';
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
		if (idx === -1) return log.error(`Unknown preset "${colors.red(type)}" provided!\nPlease run ${colors.dim('$ pwa init --help')} for info`);
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
			log.info(`Received ${colors.cyan().underline('CTRL+C')} command`);
			return log.log(`Exited ${colors.dim('$ pwa init')} setup`);
		}

		if (argv.exists && !argv.force) {
			return log.error(`Refusing to overwrite existing directory.\nPlease specify a different destination or use the ${colors.cyan('--force')} flag.`);
		}

		let dest = argv.dir;

		// Construct `package.json` file
		// ---

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

		if (argv.sw) {
			devdeps.push(argv.sw);
		}

		if (argv.preset) {
			devdeps.push(`@pwa/preset-${argv.preset}`);
			(/svelte/.test(argv.preset) ? devdeps : deps).push(argv.preset);
			if (argv.preset === 'preact') deps.push('preact-compat');
			if (argv.preset === 'react') deps.push('react-dom');
		}

		pkg.scripts = {
			build: 'pwa export',
			start: 'sirv build -s',
			watch: 'pwa watch'
		};

		if (argv.features.includes('router')) {
			template += '-router';
			styleDir += '-router';
			pkg.scripts.build += ' --routes /about,/blog,/';
			deps.push(toRouter(argv.preset));
			if (argv.preset === 'react') {
				deps.push('react-loadable');
			}
		}

		if (argv.features.includes('buble')) {
			devdeps.push('@pwa/plugin-buble');
		}

		if (argv.compress) {
			devdeps.push(`@pwa/plugin-${argv.compress}`);
		}

		pkg.dependencies = {};
		deps.sort().forEach(str => {
			pkg.dependencies[str] = versions[str] || 'latest';
		});

		pkg.devDependencies = {};
		devdeps.sort().forEach(str => {
			pkg.devDependencies[str] = versions[str] || 'latest';
		});

		// Add "browserslist" key w/ defaults
		// @see https://browserl.ist/?q=%3E+0.25%25%2C+last+1+version%2C+not+ie+11%2C+not+ie_mob+11%2C+not+dead
		pkg.browserslist = ['>0.25%', 'last 1 version', 'not ie_mob 11', 'not ie 11', 'not dead'];

		// Scaffold new files in `dest` target
		// ---

		// Write "package.json" file
		let file = join(dest, 'package.json');
		writer(file).end(JSON.stringify(pkg, null, 2));

		// Copy `.gitignore` to start us off (TODO: yuck)
		let ignore = fs.readFileSync(join(templates, '_gitignore'));
		writer(join(dest, '.gitignore')).end(ignore);

		// working w/ "src" files only now
		dest = join(dest, 'src');

		// The injectable template data
		let data = { style:styleExt };

		// Service Worker Attachment
		if (argv.sw) {
			// TODO: `swCustom` handling; scaffold empty-vs-template file?
			data.registration = '// Service Worker registration\n\t';
			data.registration += /offline/.test(argv.sw) ? `require('offline-plugin/runtime').install();` : `if ('serviceWorker' in navigator) {\n\t\tnavigator.serviceWorker.register('/sw.js');\n\t}`;
		} else {
			data.registration = '// Additional production-specific code...';
		}

		// Copy over `index.html` template
		copyFile(templates, dest, 'index.html');

		// Copy "templates/assets" over
		let destAssets = join(dest, 'assets');
		let srcAssets = join(templates, 'assets');
		glob(srcAssets).forEach(obj => {
			copyFile(srcAssets, destAssets, obj.rel);
		});

		// (SFCs) Inject "styleDir" content
		let match = /(vue|svelte)/.exec(template);
		if (match != null) {
			let tmpl = join(templates, template);
			let styl = join(templates, styleDir);

			let ext = match[1] || 'html';
			let rgx = new RegExp(`\\.${ext}$`);

			// Copy `index` style (no pair below)
			copyFile(styl, dest, `index.${styleExt}`);

			// Copy over SFCs, injecting styles
			glob(tmpl).forEach(({ rel, abs }) => {
				let src = fs.readFileSync(abs, 'utf8');
				let out = writer(join(dest, rel));
				let tmp = templite(src, data);

				if (/index|router/.test(rel)) {
					out.end(tmp);
				} else {
					// find Component's paired stylesheet
					let css = join(styl, rel.replace(rgx, `.${styleExt}`));
					css = fs.readFileSync(css, 'utf8').trim().replace(/\n/g, '\n\t');
					if (/svelte/.test(template)) {
						let esc = styleExt === 'less' ? '&' : (styleExt === 'sass' ? '\\' : '');
						css = css.replace(/\.shape(\s|\n)/g, esc + ':global(.shape)$1');
						css = css.replace(/\.intro(\s|\n)/g, esc + ':global(.intro)$1');
						css = css.replace(/(@assets)/g, '~$1'); // TODO: temporary (I hope)
					}
					out.end(tmp.replace('%%__styles__%%', css));
				}
			});
		} else {
			// Copy files as they are
			// ~> w/ filename transforms
			copyDir(template, dest, data);
			copyDir(styleDir, dest, data);
		}

		// Sign off message
		// ---

		let dir = parse(argv.dir).base;
		let txt = argv.preset ? (colors.magenta().underline(argv.preset) + ' ') : '';
		let msg = `Created a new ${txt}project within ${ colors.green().bold(dir) } 🎉\n`;

		msg += '\nInside this directory, you may:\n';
		msg += '\n – Develop within a live-reload server:';
		msg += `\n    ${colors.dim('$ pwa watch')}\n`;
		msg += '\n – Build your application for production:';
		msg += `\n    ${colors.dim('$ pwa build')}\n`;
		msg += '\n – Export routes\' HTML for static hosting:';
		msg += `\n    ${colors.dim('$ pwa export')}\n`;
		msg += '\n – Start a production HTTP file server:';
		msg += `\n    ${colors.dim('$ npm start')}\n`;

		msg += `\nThese commands have been added to your ${colors.white().underline('package.json')} already.`;
		msg += '\nWe suggest you begin by typing:\n';
		msg += '\n  ' + colors.dim(`$ cd ${dir}`);
		msg += `\n  ${colors.dim('$ npm install')}`;
		msg += `\n  ${colors.dim('$ npm run watch')}`;

		msg += `\n\nDocumentation can be found at ${colors.white().bold().underline('https://pwa.cafe/docs')}`;

		log.success(msg);
		log.success('Enjoy! 😍');
	});
}
