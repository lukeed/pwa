import { h } from 'preact';
import style from './index.{{style}}';

export default function (props) {
	return (
		<header class={ style.intro }>
			{ props.children }
		</header>
	);
}
