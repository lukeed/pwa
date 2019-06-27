import GAnalytics from 'ganalytics';
import App from '@components/App';
import './index.{{style}}';

window.app = new App({
	target: document.querySelector('#app')
});

if (process.env.NODE_ENV === 'production') {
	window.ga = new GAnalytics('UA-XXXXXXXX-X');

	{{registration}}
}
