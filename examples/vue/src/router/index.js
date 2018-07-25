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
    }
  ]
});
