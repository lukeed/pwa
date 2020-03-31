import { h } from 'preact';
import { Link } from 'preact-router';
import Intro from '@components/Intro';
import style from './index.{{style}}';

export default function (props) {
	return (
		<article class={ style.article }>
			<Intro>
				<h1 class={ style.title }>{ props.title }</h1>
				<span class={ style.subtitle }>A killer story</span>
				<p class={ style.summary }>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus laborum eaque sapiente dolorem nisi voluptate explicabo corporis, veritatis vero. Quae voluptates voluptatum ut quis quia alias tenetur impedit quam quaerat.</p>

				<div class={ style.content }>
					<Link href="/blog" class={ style.back }>Back to Blog</Link>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam maiores necessitatibus nihil quo, cupiditate consectetur voluptatem cumque ipsum consequuntur aut repellat repellendus eligendi, placeat inventore perspiciatis dolores ipsa voluptates porro.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam maiores necessitatibus nihil quo, cupiditate consectetur voluptatem cumque ipsum consequuntur aut repellat repellendus eligendi, placeat inventore perspiciatis dolores ipsa voluptates porro.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam maiores necessitatibus nihil quo, cupiditate consectetur voluptatem cumque ipsum consequuntur aut repellat repellendus eligendi, placeat inventore perspiciatis dolores ipsa voluptates porro.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam maiores necessitatibus nihil quo, cupiditate consectetur voluptatem cumque ipsum consequuntur aut repellat repellendus eligendi, placeat inventore perspiciatis dolores ipsa voluptates porro.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam maiores necessitatibus nihil quo, cupiditate consectetur voluptatem cumque ipsum consequuntur aut repellat repellendus eligendi, placeat inventore perspiciatis dolores ipsa voluptates porro.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam maiores necessitatibus nihil quo, cupiditate consectetur voluptatem cumque ipsum consequuntur aut repellat repellendus eligendi, placeat inventore perspiciatis dolores ipsa voluptates porro.</p>
				</div>
			</Intro>

		</article>
	);
}
