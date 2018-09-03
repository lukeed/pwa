import items from '@assets/features.json';
import style from './index.{{style}}';

export default function () {
	let div = document.createElement('div');
	div.className = style.features;

	let tmp, item;
	items.forEach(obj => {
		item = document.createElement('div');
		item.className = style.item;

		(tmp = document.createElement('h3')).innerText = obj.title;
		item.appendChild(tmp);

		(tmp = document.createElement('p')).innerText = obj.text;
		item.appendChild(tmp);

		div.appendChild(item);
	});

	return div;
}
