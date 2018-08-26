import { Component } from 'preact';
import style from './index.css';

export default class Hero extends Component {
	componentDidMount() {
		console.log('hero mounted');
	}

	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<div class={ style.hero }>hero</div>
		);
	}
}
