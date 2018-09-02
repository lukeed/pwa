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

	let nxt = App();
	let prev = root.firstElementChild;

	// Check for matching DOM (`export`)
	if (prev && prev.isEqualNode(nxt)) {
		root.replaceChild(nxt, prev);
	} else {
		root.appendChild(nxt);
	}

	{{registration}}
}
