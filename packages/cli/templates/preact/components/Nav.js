import { Component } from 'preact';
import style from './index.{{style}}';

export default class Nav extends Component {
	state = {
		stuck: false,
	};

	componentDidMount() {
		addEventListener('scroll', () => {
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
				<span />
				<ul>
					<li><a href="https://github.com/lukeed/pwa" class={ style.link_external }>GitHub</a></li>
					<li><a href="https://github.com/lukeed/pwa" class={ style.link_external }>Documentation</a></li>
				</ul>
			</nav>
		);
	}
}
