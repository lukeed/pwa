import style from './index.{{style}}';

export default function (props) {
	let pre = document.createElement('pre');
	pre.className = style.pre;
	if (props.offset) {
		pre.className += ` ${style.offset}`;
	}

	let tmp;
	if (props.label) {
		(tmp = document.createElement('span')).className = style.comment;
		tmp.innerText = '# ' + props.label;
		pre.appendChild(tmp);
	}

	(tmp = document.createElement('span')).className = style.text;
	tmp.innerText = '$ ' + props.text;
	pre.appendChild(tmp);

	return pre;
}
