import Vue from 'vue';
import GAnalytics from 'ganalytics';
import App from '@components/App';
import router from './router';
import './index.{{style}}';

Vue.config.productionTip = false;
const render = h => h(App);

// Mount w/ Hydration
// ~> because HTML already exists from`pwa export`
// @see https://ssr.vuejs.org/guide/hydration.html
new Vue({ router, render }).$mount('#app', true);

if (process.env.NODE_ENV === 'production') {
	window.ga = new GAnalytics('UA-XXXXXXXX-X');

	router.afterEach(nxt => {
		ga.send('pageview', { dp: nxt.path });
	});

	{{registration}}
}
