import style from './index.{{style}}';

export default function () {
	let footer = document.createElement('footer');
	footer.className = style.footer;

	let tmp;
	(tmp = document.createElement('span')).innerText = 'Made with ';
	footer.appendChild(tmp);

	(tmp = document.createElement('i')).className = style.heart;
	footer.appendChild(tmp);

	let link = document.createElement('a');
	link.href = 'http://github.com/lukeed';
	link.innerText = 'lukeed';

	(tmp = document.createElement('span')).innerText = ' by ';
	tmp.appendChild(link);
	footer.appendChild(tmp);

	return footer;
}
