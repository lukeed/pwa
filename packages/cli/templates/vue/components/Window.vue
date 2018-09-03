<template>
	<div :class="$style.window_wrap">
		<div :class="$style.window">
			<object :data="video" type="image/svg+xml" />
		</div>
	</div>
</template>

<script>
	import video from '@assets/video.svg';

	export default {
		data() {
			return { video };
		}
	}
</script>

<style module lang="{{style}}">
	%%__styles__%%
</style>
