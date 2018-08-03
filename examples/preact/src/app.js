import Router from 'preact-router';
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
			</Router>
		</div>
	);
}
