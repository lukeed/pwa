import React from 'react';
import VIDEO from '@assets/video.svg';
import style from './index.{{style}}';

export default function (props) {
	return (
		<div className={ style.window_wrap }>
			<div className={ style.window }>
				<object data={ VIDEO } type="image/svg+xml" title="pwa init" />
			</div>
		</div>
	);
}
