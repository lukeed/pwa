<template>
	<div :class="$style.app">
		<Hero />

		<main :class="$style.wrapper">
			<router-view />
		</main>

		<Footer />
	</div>
</template>

<script>
	import Footer from '@components/Footer';
	import Hero from '@components/Hero';

	export default {
	  components: {
	    Footer,
			Hero,
	  }
	}
</script>

<style module lang="{{style}}">
	%%__styles__%%
</style>
