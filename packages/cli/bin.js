#!/usr/bin/env node
const sade = require('sade');
const build = require('./lib/build');
const { version } = require('./package');
const watch = require('./lib/watch');
const init = require('./lib/init');

sade('pwa')
	.version(version)

	.command('init [framework] [dest]')
	.describe('Initialize new project')
	.option('--force', 'Force destination')
	.action(init)

	.command('build [src]')
	.describe('Build production assets')
	.option('--analyze', 'Launch interactive Analyzer to inspect production bundle(s)')
	.action(build)

	.command('export [src]')
	.describe('Export pre-rendered pages')
	.action((src, opts) => {
		opts.export = true;
		build(src, opts);
	})

	.command('watch [src]')
	.describe('Start development server')
	.option('-H, --host', 'hostname', 'localhost')
	.option('-p, --port', 'port', 8080)
	.action(watch)

	.parse(process.argv);
