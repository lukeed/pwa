import GAnalytics from 'ganalytics';
import App from '@components/App';
import './index.{{style}}';

let root = document.querySelector('#app');

if (process.env.NODE_ENV === 'development' && module.hot) {
	let elem = root.appendChild(App());

	module.hot.accept('@components/App', New => {
		New = require('@components/App').default;
		root.removeChild(elem);
		elem = root.appendChild(New());
	});
} else if (process.env.NODE_ENV === 'production') {
	window.ga = new GAnalytics('UA-XXXXXXXX-X');

	root.appendChild(App());

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/sw.js');
	}
}
