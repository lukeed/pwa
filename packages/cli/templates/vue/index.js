import Vue from 'vue';
import GAnalytics from 'ganalytics';
import App from '@components/App';
import './index.{{style}}';

Vue.config.productionTip = false;

new Vue({
	el: '#app',
	render: h => h(App)
});

if (process.env.NODE_ENV === 'production') {
	window.ga = new GAnalytics('UA-XXXXXXXX-X');

	{{registration}}
}
