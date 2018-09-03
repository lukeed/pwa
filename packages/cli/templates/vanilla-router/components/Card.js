import style from './index.{{style}}';

export default function () {
	let div = document.createElement('div');
	div.className = style.card;
	return div;
}
