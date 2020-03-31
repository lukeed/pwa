const { join } = require('path');
const { readdirSync, existsSync } = require('fs');

// @see https://babeljs.io/docs/en/next/babel-preset-typescript.html#options
exports.typescript = {
	allExtensions: true,
	isTSX: true,
}

exports.babel = function (config) {
	config.presets.push(['@babel/preset-typescript', exports.typescript]);
}

exports.webpack = function (config, env, opts) {
	const { src, production } = env;

	// search for new entrypoint
	const files = readdirSync(src);
	for (const str of files) {
		if (/\.tsx?$/i.test(str)) {
			config.entry.bundle[0] = join(src, str);
			break;
		}
	}

	// enable ts-driven extensions
	config.resolve.extensions.unshift('.ts', '.tsx');

	// update babel, prettier?, eslint? loader patterns
	const target = String(/\.jsx?$/);
	config.module.rules.forEach(obj => {
		if (String(obj.test) === target) {
			obj.test = /\.(t|j)sx?$/;
		}
	});

	if (!production) {
		config.devtool = 'inline-source-map';
	}

	if (opts.prettier) {
		opts.prettier.parser = 'babel-ts';
	}

	const tsconfig = join(env.cwd, 'tsconfig.json');
	const hasConfig = existsSync(tsconfig);

	if (opts.eslint && hasConfig) {
		let parser = opts.eslint.parserOptions || {};
		parser.project = parser.project || tsconfig;
		opts.eslint.parserOptions = parser;
	}

	if (hasConfig) {
		const TypeChecker = require('fork-ts-checker-webpack-plugin');

		config.plugins.push(
			new TypeChecker({
				eslint: !!opts.eslint,
				logger: env.log || console,
				vue: !!config.resolve.alias['vue$'],
				reportFiles: ['src/**'],
				tsconfig
			})
		);
	}
}
