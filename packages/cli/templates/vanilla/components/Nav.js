import style from './index.{{style}}';

export default function () {
	let nav = document.createElement('nav');
	nav.className = style.nav;

	nav.appendChild(
		document.createElement('span')
	);

	let li, link;
	let ul = document.createElement('ul');

	li = document.createElement('li');
	(link = document.createElement('a')).innerText = 'GitHub';
	link.href = 'https://github.com/lukeed/pwa';
	link.className = style.link_external;
	li.appendChild(link);
	ul.appendChild(li);

	li = document.createElement('li');
	(link = document.createElement('a')).innerText = 'Documentation';
	link.href = 'https://github.com/lukeed/pwa';
	link.className = style.link_external;
	li.appendChild(link);
	ul.appendChild(li);

	nav.appendChild(ul);

	addEventListener('scroll', () => {
		let bool = window.pageYOffset > 0;
		nav.classList.toggle(style.stuck, bool);
	}, { passive:true });

	return nav;
}
