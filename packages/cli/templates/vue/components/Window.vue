<template>
	<div :class="$style.window_wrap">
		<div :class="$style.window">
			<img :src="video" alt="recording" />
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
