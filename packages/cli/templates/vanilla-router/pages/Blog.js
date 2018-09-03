import Intro from '@components/Intro';
import Card from '@components/Card';
import style from './index.{{style}}';

export default function () {
	let div = document.createElement('div');
	div.className = style.blog;

	let foo, bar;
	let header = Intro();
	div.appendChild(header);

	foo = document.createElement('h1');
	foo.innerText = 'Welcome to my Blog!';
	header.appendChild(foo);

	bar = document.createElement('span');
	bar.className = style.callout;
	bar.innerText = 'NEW';

	foo = document.createElement('p');
	foo.appendChild(bar);
	foo.innerHTML += `  articles posted every week. Please be sure to subscribe if you like what you see. 👀 Yadda yadda...`;
	header.appendChild(foo);

	foo = document.createElement('p');
	foo.innerText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea nam, ratione natus. Aliquid veritatis illo veniam. Quam tempora quia provident facilis, molestiae iure reiciendis officia, fugit vitae ullam voluptatem quis.';
	header.appendChild(foo);

	foo = document.createElement('p');
	foo.innerText = 'Please select an Article to read:';
	foo.className = style.indent;
	header.appendChild(foo);

	let grid = document.createElement('div');
	grid.className = style.blog_grid;
	div.appendChild(grid);

	Array.from({ length:10 }).forEach((link, idx) => {
		link = document.createElement('a');
		link.href = `/blog/article${idx}`;
		link.className = style.blog_item;

		foo = Card();
		link.appendChild(foo);

		(bar = document.createElement('strong')).innerText = `Article #${idx}`;
		foo.appendChild(bar);

		(bar = document.createElement('em')).innerText = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore enim, natus. Beatae ducimus quasi doloremque ad quam qui dolor, architecto repellendus provident rem nostrum accusamus, magnam voluptate vel voluptas iste.`;
		foo.appendChild(bar);

		grid.appendChild(link);
	});

	return div;
}
