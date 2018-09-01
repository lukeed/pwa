import VIDEO from '@assets/video.svg';
import style from './index.{{style}}';

export default function () {
	let wrap = document.createElement('div');
	wrap.className = style.window_wrap;

	let div = document.createElement('div');
	div.className = style.window;
	wrap.appendChild(div);

	let img = document.createElement('img');
	img.alt = 'recording';
	img.src = VIDEO;

	div.appendChild(img);

	return wrap;
}
