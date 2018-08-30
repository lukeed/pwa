import GAnalytics from 'ganalytics';
import { h, render } from 'preact';
import App from '@components/App';
import './index.css';

let elem = document.querySelector('#app');
let root = render(<App/>, elem, elem.firstElementChild);

if (process.env.NODE_ENV === 'development' && module.hot) {
	// enable preact devtools
	require('preact/debug');
	// respond to HMR updates
	module.hot.accept('@components/App', New => {
		New = require('@components/App').default;
		root = render(<New />, elem, root);
	});
} else if (process.env.NODE_ENV === 'production') {
	window.ga = new GAnalytics('UA-71341501-5');

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/sw.js');
	}
}
