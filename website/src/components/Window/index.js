import style from './index.css';
import VIDEO from '@assets/video.svg';

export default function (props) {
	return (
		<div class={ style.window_wrap }>
			<div class={ style.window }>
				<img src={ VIDEO } alt="recording" />
			</div>
		</div>
	);
}
