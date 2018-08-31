import React from 'react';
import style from './index.{{style}}';

export default function (props) {
	let cls = style.pre;
	if (props.offset) cls += ` ${style.offset}`;
	return (
		<pre className={ cls }>
			{ props.label && <span className={ style.comment }># { props.label }</span> }
			<span className={ style.text }>$ { props.text }</span>
		</pre>
	);
}
