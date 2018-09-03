import { Component } from 'preact';
import { Link } from 'preact-router';
import style from './index.{{style}}';

export default class Nav extends Component {
	state = {
		stuck: false,
	};

	componentDidMount() {
		addEventListener('scroll', ev => {
			let stuck = window.pageYOffset > 0;
			this.setState({ stuck });
		}, { passive:true });
	}

	shouldComponentUpdate(_, nxt) {
		let now = this.state;
		return now.stuck !== nxt.stuck;
	}

	render(_, state) {
		let cls = style.nav;
		if (state.stuck) cls += ` ${style.stuck}`;

		return (
			<nav class={ cls }>
				<ul class={ style.links }>
					<li><Link href="/">Home</Link></li>
					<li><Link href="/blog">Blog</Link></li>
					<li><Link href="/about">About</Link></li>
				</ul>

				<ul>
					<li><a href="https://github.com/lukeed/pwa" class={ style.link_external }>GitHub</a></li>
					<li><a href="https://github.com/lukeed/pwa" class={ style.link_external }>Documentation</a></li>
				</ul>
			</nav>
		);
	}
}
