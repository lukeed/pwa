import Intro from '@components/Intro';
import style from './index.{{style}}';

export default function (props) {
	let article = document.createElement('article');
	article.className = style.article;

	let foo, bar;
	let header = Intro();
	article.appendChild(header);

	foo = document.createElement('h1');
	foo.innerText = props.title;
	foo.className = style.title;
	header.appendChild(foo);

	foo = document.createElement('span');
	foo.innerText = 'A killer story';
	foo.className = style.subtitle;
	header.appendChild(foo);

	foo = document.createElement('p');
	foo.className = style.summary;
	foo.innerText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus laborum eaque sapiente dolorem nisi voluptate explicabo corporis, veritatis vero. Quae voluptates voluptatum ut quis quia alias tenetur impedit quam quaerat.';
	header.appendChild(foo);

	(foo = document.createElement('div')).className = style.content;
	header.appendChild(foo);

	(bar = document.createElement('a')).href = '/blog';
	bar.innerText = 'Back to Blog';
	bar.className = style.back;
	foo.appendChild(bar);

	Array.from({ length:6 }).forEach(() => {
		bar = document.createElement('p');
		bar.innerText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam maiores necessitatibus nihil quo, cupiditate consectetur voluptatem cumque ipsum consequuntur aut repellat repellendus eligendi, placeat inventore perspiciatis dolores ipsa voluptates porro.';
		foo.appendChild(bar);
	});

	return article;
}
