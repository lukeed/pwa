<template>
	<nav :class="[$style.nav, { [$style.stuck]: stuck }]">
		<ul :class="$style.links">
			<li><router-link to="/">Home</router-link></li>
			<li><router-link to="/blog">Blog</router-link></li>
			<li><router-link to="/about">About</router-link></li>
		</ul>

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
