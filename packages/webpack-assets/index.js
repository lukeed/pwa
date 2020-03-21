const { parse } = require('url');
const { relative } = require('path');
const totalist = require('totalist/sync');
const { existsSync, readFileSync } = require('fs');

const NAME = '@pwa/webpack-assets';

class CopyAssets {
	constructor(src, dir, opts={}) {
		this.src = src;
		this.dir = dir;
		this.log = opts.log || console;
	}

	apply(compiler) {
		let src = this.src || compiler.options.context; // "src" | root
		let dir = this.dir || compiler.options.resolve.alias['@assets'];

		if (!existsSync(src)) return this.log.warn(`Missing source directory: ${src}`);
		if (!existsSync(dir)) return this.log.warn(`Missing assets directory: ${dir}`);

		let set = new Set();
		totalist(dir, (rel, abs) => {
			set.add(abs);
		});

		// Remove a file from the set if within `dir`.
		// ~> the "filename" may be different
		// ~~> eg; via `vue-loader` (already transformed)
		function toPurge(mod, filename) {
			let m = mod.resource;
			if (m && m.startsWith(dir)) {
				// webpack will add `?query` to files sometimes
				set.delete(parse(m).pathname);
				if (filename && typeof filename === 'string') {
					set.delete(filename);
				}
			}
		}

		compiler.hooks.compilation.tap(NAME, c => {
			c.hooks.moduleAsset.tap(NAME, toPurge);
			c.hooks.afterOptimizeModules.tap(NAME, mods => {
				mods.forEach(toPurge);
			});
		});

		// Add any remaining "/assets/**" to Webpack tree
		compiler.hooks.shouldEmit.tap(NAME, c => {
			set.forEach(file => {
				let val = readFileSync(file);
				c.assets[relative(src, file)] = {
					size: () => val.length,
					source: () => val
				};
			});
		});
	}
}

module.exports = CopyAssets;
