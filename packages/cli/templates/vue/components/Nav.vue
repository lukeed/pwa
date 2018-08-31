<template>
	<nav :class="[$style.nav, { [$style.stuck]: stuck }]">
		<span />
		<ul>
			<li><a href="https://github.com/lukeed/pwa" :class="$style.link_external">GitHub</a></li>
			<li><a href="https://github.com/lukeed/pwa" :class="$style.link_external">Documentation</a></li>
		</ul>
	</nav>
</template>

<script>
	export default {
		data() {
			return {
				stuck: false
			};
		},
		mounted() {
			addEventListener('scroll', ev => {
				this.stuck = window.pageYOffset > 0;
			}, { passive:true });
		}
	}
</script>

<style module lang="{{style}}">
	%%__styles__%%
</style>
