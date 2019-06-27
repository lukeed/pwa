<nav class={classes}>
	<span />
	<ul>
		<li><a href="https://github.com/lukeed/pwa" class="link_external">GitHub</a></li>
		<li><a href="https://github.com/lukeed/pwa" class="link_external">Documentation</a></li>
	</ul>
</nav>

<script>
	import { onMount } from 'svelte';

	let stuck = false;

	function onScroll(ev) {
		stuck = window.pageYOffset > 0;
	}

	$: classes = 'nav' + (stuck ? ' stuck' : '');

	onMount(() => {
		addEventListener('scroll', onScroll, { passive:true });

		return () => {
			removeEventListener('scroll', onScroll);
		}
	});
</script>

<style lang="{{style}}">
	%%__styles__%%
</style>
