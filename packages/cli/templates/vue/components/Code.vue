<template>
	<pre :class="[$style.pre, { [$style.offset]: offset }]">
		<span v-if="label" :class="$style.comment" v-html="'# '+ label" />
		<span :class="$style.text" v-html="'$ ' + text" />
	</pre>
</template>

<script>
	export default {
		props: ['offset', 'label', 'text']
	}
</script>

<style module lang="{{style}}">
	%%__styles__%%
</style>
