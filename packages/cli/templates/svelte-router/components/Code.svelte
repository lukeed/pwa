<pre class={classes}>
	{#if label}
		<span class="comment"># {label}</span>
	{/if}
	<span class="text"># {text}</span>
</pre>

<script>
	export let label = '';
	export let offset = false;
	export let text = '';

	$: classes = 'pre' + (offset ? ' offset' : '');
</script>

<style lang="{{style}}">
	%%__styles__%%
</style>
