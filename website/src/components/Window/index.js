import { h } from 'zak';
import style from './index.css';
import VIDEO from '@assets/video.svg';

export default function (props) {
	return (
		<div class={ style.window_wrap }>
			<div class={ style.window }>
				<object data={ VIDEO } type="image/svg+xml">pwa init options</object>
			</div>
		</div>
	);
}
