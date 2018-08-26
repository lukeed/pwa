<template>
	<nav :class="$style.nav">hero</nav>
</template>

<script>
	export default {
		data: {
			stuck: false
		},
		computed: {
			classes() {
				console.log(this);
				return 'hello';
			}
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
