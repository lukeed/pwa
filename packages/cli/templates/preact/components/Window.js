import VIDEO from '@assets/video.svg';
import style from './index.{{style}}';

export default function (props) {
	return (
		<div class={ style.window_wrap }>
			<div class={ style.window }>
				<img src={ VIDEO } alt="recording" />
			</div>
		</div>
	);
}
