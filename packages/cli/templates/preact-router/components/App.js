import { Component } from 'preact';
import { Router } from 'preact-router';
import Footer from '@components/Footer';
import Hero from '@components/Hero';

import Home from 'async!@pages/Home';
import About from 'async!@pages/About';
import Article from 'async!@pages/Article';
import Blog from 'async!@pages/Blog';

import style from './index.{{style}}';

export default class App extends Component {
	onRoute = e => {
		if (process.env.NODE_ENV === 'production') {
			if (!!e.previous && window.ga) {
				ga.send('pageview');
			}
		}
	}

	render() {
		return (
			<div class={ style.app }>
				<Hero />

				<main class={ style.wrapper }>
					<Router onChange={ this.onRoute }>
						<Home path="/" />
						<About path="/about" />
						<Article path="/blog/:title" />
						<Blog path="/blog" />
					</Router>
				</main>

				<Footer />
			</div>
		);
	}
}
