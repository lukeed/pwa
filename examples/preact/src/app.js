import Router from 'preact-router';
import Contact from '@pages/contact';
import About from '@pages/about';
import Home from '@pages/index';
import Nav from '@tags/nav';

export default function (props) {
	return (
		<div id="app">
			<Nav />
			<Router url={ props.url }>
				<Home path="/" />
				<About path="/about" />
				<Contact path="/contact" />
			</Router>
		</div>
	);
}
