import React from 'react';
import items from '@assets/features.json';
import style from './index.{{style}}';

function Item(props) {
	return (
		<div key={ props.title } className={ style.item }>
			<h3>{ props.title }</h3>
			<p>{ props.text }</p>
		</div>
	);
}

export default function (props) {
	return (
		<div className={ style.features }>{ items.map(Item) }</div>
	);
}
