import { Component } from 'preact';
import style from './index.css';

export default class Nav extends Component {
	state = {
		stuck: false,
	};

	componentDidMount() {
		document.addEventListener('scroll', ev => {
			let stuck = this.base.getBoundingClientRect().top === 0;
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
				<p>links</p>
			</nav>
		);
	}
}
