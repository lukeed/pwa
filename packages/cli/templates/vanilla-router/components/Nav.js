import style from './index.{{style}}';

export default function () {
	let nav = document.createElement('nav');
	nav.className = style.nav;

	let ul, li, link;

	// Left Menu
	ul = document.createElement('ul');
	ul.className = style.links;

	li = document.createElement('li');
	(link = document.createElement('a')).href = '/';
	link.innerText = 'Home';
	li.appendChild(link);
	ul.appendChild(li);

	li = document.createElement('li');
	(link = document.createElement('a')).href = '/blog';
	link.innerText = 'Blog';
	li.appendChild(link);
	ul.appendChild(li);

	li = document.createElement('li');
	(link = document.createElement('a')).href = '/about';
	link.innerText = 'About';
	li.appendChild(link);
	ul.appendChild(li);

	nav.appendChild(ul);

	// Right Menu
	ul = document.createElement('ul');
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
