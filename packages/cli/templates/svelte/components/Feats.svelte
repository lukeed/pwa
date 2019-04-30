<div class="features">
	{#each items as item}
		<div class="item">
			<h3>{item.title}</h3>
			<p>{item.text}</p>
		</div>
	{/each}
</div>

<script>
	import items from '@assets/features.json';
</script>

<style lang="{{style}}">
	%%__styles__%%
</style>
