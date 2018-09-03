import React from 'react';
import { HMR } from '@pwa/preset-react';
import { Link } from 'react-router-dom';
import Intro from '@components/Intro';
import style from './index.{{style}}';

function Article(props) {
	return (
		<article className={ style.article }>
			<Intro>
				<h1 className={ style.title }>{ props.match.params.title }</h1>
				<span className={ style.subtitle }>A killer story</span>
				<p className={ style.summary }>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus laborum eaque sapiente dolorem nisi voluptate explicabo corporis, veritatis vero. Quae voluptates voluptatum ut quis quia alias tenetur impedit quam quaerat.</p>

				<div className={ style.content }>
					<Link to="/blog" className={ style.back }>Back to Blog</Link>
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

export default HMR(Article, module);
