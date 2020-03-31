import { h } from 'preact';
import style from './index.{{style}}';

export default function () {
	return (
		<footer class={ style.footer }>
			<span>Made with </span>
			<i class={ style.heart } />
			<span> by <a href="https://github.com/lukeed">lukeed</a></span>
		</footer>
	);
}
