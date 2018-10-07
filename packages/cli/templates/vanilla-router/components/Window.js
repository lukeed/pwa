import VIDEO from '@assets/video.svg';
import style from './index.{{style}}';

export default function () {
	let wrap = document.createElement('div');
	wrap.className = style.window_wrap;

	let div = document.createElement('div');
	div.className = style.window;
	wrap.appendChild(div);

	let obj = document.createElement('object');
	obj.innerText = 'pwa init';
	obj.type = 'image/svg+xml';
	obj.data = VIDEO;

	div.appendChild(obj);

	return wrap;
}
