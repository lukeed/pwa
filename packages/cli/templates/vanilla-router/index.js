import Navaid from 'navaid';
import GAnalytics from 'ganalytics';
import App from '@components/App';
import './index.{{style}}';

let main, elem;
let root = document.querySelector('#app');

function init() {
	elem = App();
	main = elem._main;
	let prev = root.firstElementChild;

	// Check for matching DOM (`export`)
	if (prev) {
		root.replaceChild(elem, prev);
	} else {
		root.appendChild(elem);
	}

	Navaid('/')
		.on('/', () => import('@pages/Home').then(draw))
		.on('/blog', () => import('@pages/Blog').then(draw))
		.on('/blog/:title', o => import('@pages/Article').then(m => draw(m, o)))
		.on('/about', () => import('@pages/About').then(draw))
		.listen();
}

function draw(m, props) {
	m = m.default || m;
	props = props || {};
	if (main.firstElementChild) {
		main.removeChild(main.firstElementChild);
	}
	main.appendChild(m(props));
}

init();

if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('@components/App', New => {
		New = require('@components/App').default;
		root.removeChild(elem);
		elem = root.appendChild(New());
		main = elem._main;
	});
} else if (process.env.NODE_ENV === 'production') {
	window.ga = new GAnalytics('UA-XXXXXXXX-X');

	function track(obj) {
		ga.send('pageview', { dp:obj.uri });
	}

	addEventListener('replacestate', track);
	addEventListener('pushstate', track);
	addEventListener('popstate', track);

	{{registration}}
}
