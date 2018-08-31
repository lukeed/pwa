<template>
	<div :class="$style.features">
		<div :class="$style.item"
			v-for="item in items"
			:key="item.title"
		>
			<h3 v-html="item.title" />
			<p v-html="item.text" />
		</div>
	</div>
</template>

<script>
	import items from '@assets/features.json';

	export default {
		data() {
			return { items };
		}
	}
</script>

<style module lang="{{style}}">
	%%__styles__%%
</style>
