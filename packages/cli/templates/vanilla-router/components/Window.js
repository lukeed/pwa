import VIDEO from '@assets/video.svg';
import style from './index.{{style}}';

export default function () {
	let wrap = document.createElement('div');
	wrap.className = style.window_wrap;

	let div = document.createElement('div');
	div.className = style.window;
	wrap.appendChild(div);

	let obj = document.createElement('object');
	obj.type = 'image/svg+xml';
	obj.title = 'pwa init';
	obj.data = VIDEO;

	div.appendChild(obj);

	return wrap;
}
