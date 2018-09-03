import Footer from '@components/Footer';
import Hero from '@components/Hero';
import style from './index.{{style}}';

export default function () {
	let app = document.createElement('div');
	app.className = style.app;

	let hero = app.appendChild(Hero());
	if (typeof hero.animate === 'function') {
		setTimeout(hero.animate, 1e3);
	}

	let main = document.createElement('main');
	main.className = style.wrapper;

	app._main = main;
	app.appendChild(main);
	app.appendChild(Footer());

	return app;
}
