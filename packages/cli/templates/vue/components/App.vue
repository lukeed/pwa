<template>
	<div :class="$style.app">
		<Intro />
		<Nav />
		<section :class="$style.features">
			<Feat />
			<Feat />
			<Feat />
		</section>
	</div>
</template>

<script>
	import Intro from '@components/Intro';
	import Feat from '@components/Feat';
	import Nav from '@components/Nav';

	export default {
	  components: {
	    Intro,
	    Feat,
	    Nav
	  }
	}
</script>

<style module lang="{{style}}">
	%%__styles__%%
</style>
