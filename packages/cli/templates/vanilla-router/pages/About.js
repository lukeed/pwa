import Intro from '@components/Intro';
import style from './index.{{style}}';

export default function () {
	let div = document.createElement('div');
	div.className = style.about;

	let header = Intro();
	div.appendChild(header);

	let foo;
	(foo = document.createElement('h1')).innerText = 'About Page';
	header.appendChild(foo);

	foo = document.createElement('p');
	foo.innerHTML = 'This is a <em>very</em> generic about page.';
	header.appendChild(foo);

	foo = document.createElement('p');
	foo.innerText = `There's really nothing to say here, especially since this is just a demo template! 😉`;
	header.appendChild(foo);

	foo = document.createElement('p');
	foo.innerText = `So.. you're gunna get a bunch of Lorem Ipsum text instead. Have a nice day!`;
	header.appendChild(foo);

	Array.from({ length:3 }).forEach(() => {
		foo = document.createElement('p');
		foo.innerText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit error culpa dolore blanditiis expedita beatae, quis saepe eveniet facilis esse. Assumenda, odit voluptates doloremque eligendi libero hic incidunt, alias cum!';
		header.appendChild(foo);
	});

	return div;
}
