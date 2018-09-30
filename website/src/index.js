import { h } from 'zak';
import GAnalytics from 'ganalytics';
import App from '@components/App';
import './index.css';

let root = document.querySelector('#app');
let prev = root.firstElementChild;
let elem = App();

if (prev) {
	root.replaceChild(elem, prev);
} else {
	root.appendChild(elem);
}

if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('@components/App', New => {
		New = require('@components/App').default;
		root.removeChild(elem);
		elem = root.appendChild(New());
	});
} else if (process.env.NODE_ENV === 'production') {
	window.ga = new GAnalytics('UA-71341501-5');

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/sw.js');
	}
}
