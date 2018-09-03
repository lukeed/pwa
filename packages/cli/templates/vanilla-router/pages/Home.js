import Window from '@components/Window';
import Feats from '@components/Feats';
import Code from '@components/Code';
import style from './index.{{style}}';

export default function () {
	let div = document.createElement('div');

	div.appendChild(Window());
	div.appendChild(Feats());

	let section, title;
	(section = document.createElement('section')).className = style.section;
	(title = document.createElement('h2')).innerText = 'Installation';
	section.appendChild(title);

	section.appendChild(
		Code({
			text: 'npm install --global @pwa/cli'
		})
	);

	section.appendChild(
		Code({
			label: 'OR',
			text: 'yarn global add @pwa/cli',
			offset: true
		})
	);

	div.appendChild(section);

	(section = document.createElement('section')).className = style.section;
	(title = document.createElement('h2')).innerText = 'Commands';
	section.appendChild(title);

	section.appendChild(
		Code({
			label: 'Scaffold a new project!',
			text: 'pwa init'
		})
	);

	section.appendChild(
		Code({
			label: 'Run development/live-reload server',
			text: 'pwa watch'
		})
	);

	section.appendChild(
		Code({
			label: 'Build production bundle(s)',
			text: 'pwa build'
		})
	);

	section.appendChild(
		Code({
			label: 'Generate static HTML exports',
			text: 'pwa export'
		})
	);

	div.appendChild(section);

	return div;
}
