import { h, mount } from 'zak';
import style from './index.css';

export default function () {
	let nav = h('nav', { className:style.nav });

	mount(nav, [
		<span />,
		<ul>
			<li><a class={ style.link_external } href="https://github.com/lukeed/pwa">GitHub</a></li>
			<li><a class={ style.link_external } href="https://github.com/lukeed/pwa">Documentation</a></li>
		</ul>
	]);

	addEventListener('scroll', () => {
		let bool = window.pageYOffset > 0;
		nav.classList.toggle(style.stuck, bool);
	}, { passive:true });

	return nav;
}
