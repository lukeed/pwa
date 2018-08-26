<template>
	<nav :class="[$style.nav, { [$style.stuck]: stuck }]">links</nav>
</template>

<script>
	export default {
		data() {
			return {
				stuck: false
			};
		},
		mounted() {
			document.addEventListener('scroll', ev => {
				this.stuck = this.$el.getBoundingClientRect().top === 0;
			}, { passive:true });
		}
	}
</script>

<style module lang="{{style}}">
	%%__styles__%%
</style>
