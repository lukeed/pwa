import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: () => import('@pages/Home')
		}, {
			path: '/about',
			component: () => import('@pages/About')
		}, {
			path: '/blog',
			component: () => import('@pages/Blog')
		}, {
			path: '/blog/:title',
			component: () => import('@pages/Article')
		}
	]
});
