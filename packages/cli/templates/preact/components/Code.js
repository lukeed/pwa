import { h } from 'preact';
import style from './index.{{style}}';

export default function (props) {
	let cls = style.pre;
	if (props.offset) cls += ` ${style.offset}`;
	return (
		<pre class={ cls }>
			{ props.label && <span class={ style.comment }># { props.label }</span> }
			<span class={ style.text }>$ { props.text }</span>
		</pre>
	);
}
