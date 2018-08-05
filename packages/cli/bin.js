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
	.option('-o, --dest', 'Path to output directory', 'build')
	.action(build)

	.command('export [src]')
	.describe('Export pre-rendered pages')
	.option('-o, --dest', 'Path to output directory', 'build')
	.option('-r, --routes', 'Comma-delimited list of routes to export')
	.action((src, opts) => {
		opts.export = true;
		build(src, opts);
	})

	.command('watch [src]')
	.describe('Start development server')
	.option('-H, --host', 'A hostname on which to start the application', 'localhost')
	.option('-p, --port', 'A port number on which to start the application', 8080)
	.option('-q, --quiet', 'Disable logging to terminal, including errors and warnings')
	.option('--https', 'Run the application over HTTP/2 with HTTPS')
	.option('--key', 'Path to custom SSL certificate key')
	.option('--cert', 'Path to custom SSL certificate')
	.option('--cacert', 'Path to custom CA certificate override')
	.action(watch)

	.parse(process.argv);
