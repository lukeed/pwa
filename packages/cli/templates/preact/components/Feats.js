import items from '@assets/features.json';
import style from './index.{{style}}';

function Item(props) {
	return (
		<div class={ style.item }>
			<h3>{ props.title }</h3>
			<p>{ props.text }</p>
		</div>
	);
}

export default function (props) {
	return (
		<div class={ style.features }>
			{ items.map(Item) }
		</div>
	)
}
