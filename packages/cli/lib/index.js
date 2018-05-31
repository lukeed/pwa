#!/usr/bin/env node
const sade = require('sade');
const { version } = require('../package');

sade('pwa')
	.version(version)

	.command('init [framework] [dest]')
	.describe('Initialize new project')

	.command('build [dir]')
	.describe('Build production assets')

	.command('export [dir]')
	.describe('Export pre-rendered pages')

	.command('watch [dir]')
	.describe('Start development server')

	.parse(process.argv);
