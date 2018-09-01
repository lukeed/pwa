import Footer from '@components/Footer';
import Window from '@components/Window';
import Feats from '@components/Feats';
import Hero from '@components/Hero';
import Code from '@components/Code';
import style from './index.{{style}}';

export default function () {
	let app = document.createElement('div');
	app.className = style.app;

	let hero = app.appendChild(Hero());
	if (typeof hero.animate === 'function') {
		setTimeout(hero.animate, 1e3);
	}

	app.appendChild(Window());

	let main = document.createElement('main');
	main.className = style.wrapper;

	let title, section;
	main.appendChild(Feats());

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

	main.appendChild(section);

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

	main.appendChild(section);

	app.appendChild(main);
	app.appendChild(Footer());

	return app;
}
