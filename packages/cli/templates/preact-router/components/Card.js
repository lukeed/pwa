import { h } from 'preact';
import style from './index.{{style}}';

export default function (props) {
	return (
		<div class={ style.card }>
			{ props.children }
		</div>
	);
}
