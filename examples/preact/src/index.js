import { h, render } from 'preact';
import App from './app';
import './index.css';

let elem = document.querySelector('#app');
let root = render(<App/>, elem, elem.firstElementChild);

if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./app.js', New => {
		New = require('./app').default;
		root = render(<New />, elem, root);
	});
}
