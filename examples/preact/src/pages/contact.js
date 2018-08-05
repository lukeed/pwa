import { Component } from 'preact';

const Name = props => <li>{ props.name } { props.surname } from { props.region }</li>

export default class Contact extends Component {
	state = { items:[] }

	componentWillMount() {
		fetch('http://uinames.com/api/?amount=25').then(r => r.json()).then(arr => {
			this.setState({ items:arr });
		});
	}

	render(_, state) {
		return (
			<div class="page">
				<h1>Contact Page</h1>
				<ul>{ state.items.map(Name) }</ul>
			</div>
		);
	}
}
