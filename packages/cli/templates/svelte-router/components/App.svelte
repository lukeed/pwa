<div class="app">
	<Hero />

	<main class="wrapper">
		<svelte:component this={ Route } { params } />
	</main>

	<Footer />
</div>

<script>
	import Navaid from 'navaid';
	import { onMount } from 'svelte';
	import Footer from '@components/Footer';
	import Hero from '@components/Hero';

	let Route, params={};

	function draw(m, params) {
		params = params || {};
		Route = m.default || m;
	}

	function track(obj) {
		if (window.ga) {
			ga.send('pageview', { dp:obj.uri });
		}
	}

	const router = (
		Navaid('/')
			.on('/', () => import('@pages/Home').then(draw))
			.on('/blog', () => import('@pages/Blog').then(draw))
			.on('/blog/:title', obj => import('@pages/Article').then(m => draw(m, obj)))
			.on('/about', () => import('@pages/About').then(draw))
	);

	onMount(() => {
		router.listen();
		addEventListener('replacestate', track);
		addEventListener('pushstate', track);
		addEventListener('popstate', track);

		return () => {
			removeEventListener('replacestate', track);
			removeEventListener('pushstate', track);
			removeEventListener('popstate', track);
			router.unlisten();
		};
	});
</script>

<style lang="{{style}}">
	%%__styles__%%
</style>
