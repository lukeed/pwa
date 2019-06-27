<div class="blog">
	<Intro>
		<h1>Welcome to my Blog!</h1>
		<p><span class="callout">NEW</span> articles posted every week. Please be sure to subscribe if you like what you see. 👀 Yadda yadda...</p>
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea nam, ratione natus. Aliquid veritatis illo veniam. Quam tempora quia provident facilis, molestiae iure reiciendis officia, fugit vitae ullam voluptatem quis.</p>
		<p class="indent">Please select an Article to read:</p>
	</Intro>

	<div class="blog_grid">
		{#each items as _item, idx}
			<a class="blog_item" href={ `/blog/article${idx}` }>
				<Card>
					<strong>Article #{idx}</strong>
					<em>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore enim, natus. Beatae ducimus quasi doloremque ad quam qui dolor, architecto repellendus provident rem nostrum accusamus, magnam voluptate vel voluptas iste.</em>
				</Card>
			</a>
		{/each}
	</div>
</div>

<script>
	import Intro from '@components/Intro';
	import Card from '@components/Card';

	const items = Array.from({ length:10 });
</script>

<style lang="{{style}}">
	%%__styles__%%
</style>
